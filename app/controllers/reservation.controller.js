// reservation control

const db = require("../models");
const config = require("../config/auth.config");
const Tables= db.tables;
const Reservations = db.reservation

const moment = require('moment');

const Op = db.Sequelize.Op;

const today = moment().startOf('day').utc().toDate();



exports.getAllReservations = (req, res) => {
    Reservations.findAll().then( rsrvtn =>{
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

  Reservations.findAll({  
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

exports.getCalendar = (req,res) => {}

exports.cancelReservation = (req,res) => {	
	Reservations.destroy({
	  where: { reservation_id: req.body.reservation_id }
	}).then(res.send("Reservation deleted"));
}

