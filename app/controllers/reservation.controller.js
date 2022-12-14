// reservation control

const db = require("../models");
const config = require("../config/auth.config");
const Tables= db.tables;
const Reservations = db.reservation

const moment = require('moment');

const Op = db.Sequelize.Op;

const today = moment().startOf('day').utc().toDate();



exports.getAllReservations = (req, res) => {
    
  // Restaurant employees and admins can view all reservations for the current working day.
  // The API should support pagination to avoid loading a huge amount of reservations at
  // once.
  // Employees can sort the reservations by time in ascending or descending manner.
  const page = req.query.page;
  var pageoffset = req.query.page*5;
  if(!page){
     pageoffset = 0;
  } 
  const sort = req.query.sort;
  var sort_key = "";
  if (sort == "DESC"){
    sort_key = "DESC"
  } else {
    sort_key = "ASC"
  }

  Reservations.findAndCountAll({
    where: {
      reservation_date :today
    },
    order: [['start_time',sort_key]],
    limit: 5,
    offset: pageoffset
  }).then( rsrvtn =>{
    res.status(200).send(rsrvtn);
  }
    ).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.checkSlots = (req,res) => {
    const party_size = req.body.party_size;
    const reservation_date = today;
  // check table capacity
  // -> check reservations at those tables
  // -> sort asc/desc
  // available slots checking



  Reservations.findAll({ 
    where: { reservation_date : today},
    order:  [['start_time', 'ASC']], 
    include: { 
      model: Tables, 
      where: {
        capacity: {
          [Op.gte]: party_size
        }
      }
    } 
   }).then(tasks => {
      res.send(tasks)
  });
}

exports.reserveTable = (req,res) => {
    const party_size = req.body.party_size;
    const reservation_date = req.body.reservation_date;
    const start_hour = req.body.start_hour;
    const start_minute = req.body.start_minute;
    const duration = req.body.duration;

    const booking_start =  moment(reservation_date).add(start_minute, 'minutes').add(start_hour, 'hour').utc().toDate();
    const booking_end = moment(booking_start).add(duration, 'minutes').utc().toDate();

      // check table size -> 
      // get all table fitting of size -> 
      // check availability of each table -> 
      // book first available ->
      // else no slot available
    const match_tables = []

  // find all table with enough capacity
  Tables.findAll({
    order:  [['capacity', 'ASC']],
    where:{
      capacity: {
        [Op.gte]: party_size
      }
    }
  }).then(fit_tables => {
    // console.log(fit_tables);
    fit_tables.forEach(tbl =>{
      match_tables.push(tbl.table_no)
    })
    
  }).then( out =>{
      Reservations.findAll({
        // table number match, reservation no clash
        where : {
            [Op.and]: [
              { slot_range: { [Op.overlap]: [booking_start,booking_end] }}
            ]
          }
      }).then( reservations => {
          const exclude_table = [];
          // reserve first available slot if no clash. try next table if clash

          if(reservations.length ==0 ){
            console.log("available tables", match_tables);
            Reservations.create({
              party_size: party_size,
              reservation_date: reservation_date,
              start_time: booking_start,
              end_time: booking_end,
              slot_range: [booking_start, booking_end],
              table_no:match_tables[0]
            }).then(booking => {
              res.status(200).send(booking)
            })
          } else {

                // remove busy tables then reserve first available
            reservations.forEach(busyTable =>{
              exclude_table.push(busyTable.table_no);
            })
            console.log("check and remove busy tables", exclude_table);

            const avaible_tbls = match_tables.filter(n => !exclude_table.includes(n));
            // check if tables still available

            if(avaible_tbls.length == 0){
              res.send("no tables for selected size and time")
            } else {
              console.log("remain " + avaible_tbls)
              Reservations.create({
                party_size: party_size,
                reservation_date: reservation_date,
                start_time: booking_start,
                end_time: booking_end,
                slot_range: [booking_start, booking_end],
                table_no:avaible_tbls[0]
              }).then(booking =>{
                res.status(200).send(booking)
              })
            }
          }
      })
  })
}

exports.getCalendar = (req,res) => {

  // Get all reservations
  // Only admins can view all reservations for all times.
  // API must support pagination to avoid loading huge amounts of reservations at once.
  // Admins can filter reservation by table(s).
  // Admins can filter reservations by a date range.


  var check_for_date = moment();
  if(req.query.date){
    check_for_date= moment(req.query.date)
  }
  var table_check = req.query.table;

  const page = req.query.page;
  var pageoffset = req.query.page*5;
  if(!page){
     pageoffset = 0;
  } 
  const sort = req.query.sort;
  var sort_key = "";
  if (sort == "DESC"){
    sort_key = "DESC"
  } else {
    sort_key = "ASC"
  }

  Reservations.findAndCountAll({
    where: {
      reservation_date: check_for_date,
      table_no: table_check
    },
    order: [['start_time',sort_key]],
    limit: 5,
    offset: pageoffset
  }).then( rsrvtn =>{
    res.status(200).send(rsrvtn);
  }
    ).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.everyReservation = (req,res) =>{
  Reservations.findAndCountAll().then(bookings =>{
    res.status(200).send(bookings);
  })
}

exports.cancelReservation = (req,res) => {	
	
  Reservations.findByPk(req.body.reservation_id).then(booking => {
    const future_booking = moment().utc().isSameOrAfter(booking.end_time); 
    const same_date = moment().format('YYYY-MM-DD');

    // current time is greater than reservation end time. so dont allow delete
    if(!future_booking){
        Reservations.destroy({
          where: { reservation_id: req.body.reservation_id }
        }).then(booking => {res.send({"Reservation deleted": booking})}).catch(err =>{
          res.status(500).send(err)
        });
    } else {
      res.send("Active and past booking cant be deleted")
    }

  }).catch(err =>{
    res.status(500).send(err);
  })


}