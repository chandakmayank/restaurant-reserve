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
      res.status(200).send({
          rsrvtn
        });
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



const tasks = Reservations.findAll({ 
   include: { model: Tables } }).then(tasks => {
    console.log(JSON.stringify(tasks, null, 2));
    res.send(tasks)
});



// Tables.findAll({
//   where: {capacity:{[Op.gt]: party_size}}
// }).then(tables => {
//   tables.forEach( table_num => {

//     console.log(table_num.table_no)
//    Reservations.findAll({
//       where: {
//         [Op.and]:[
//           {table_no: {
//             [Op.eq]: table_num.table_no
//           }},
//           {reservation_date: {
//             [Op.eq]: today
//           }}
//         ]
//       }
//     }).then(found_reservations => {
//       console.log(found_reservations)
//       res.send(found_reservations)
//     })  
//   })
//   res.end();
// })
    
}

exports.reserveTable = (req,res) => {
    const party_size = req.body.party_size;
    const reservation_date = req.body.reservation_date;
    const start_hour = req.body.start_hour;
    const start_minute = req.body.start_minute;
    const duration = req.body.duration;

const booking_start =  moment(reservation_date).add(start_minute, 'minutes').add(start_hour, 'hour').utc().toDate();
const booking_end = moment(booking_start).add(duration, 'minutes').utc().toDate();

console.log(booking_start,booking_end)

console.log("time slot" + reservation_date)
  // check table size -> 
  // get all table fitting of size -> 
  // check availability of each table -> 
  // book first available ->
  // else no slot available

  Tables.findAll({
    where: {
      capacity: {
        [Op.gt]: party_size
      }
    }
  }).then( result => {
    // console.log(result)
    // res.send(result)
      result.forEach(table => {
        console.log(table.table_no)
          Reservations.findAll({
            where: {table_no: {
              [Op.eq]: table.table_no
            }}
          }).then( table_match => {
            console.log(table_match.reservation_id)
            // res.send(table_match)
            Reservations.findAll({
              where: {slot_range: {
                [Op.overlap]: [booking_start,booking_end]
              }}
            }).then(overlaps => {
              res.send(overlaps)
              // actual code for resercvation
            })
          })
      })
    });

}

exports.getCalendar = (req,res) => {}

exports.cancelReservation = (req,res) => {	
	Reservations.destroy({
	  where: { reservation_id: req.body.reservation_id }
	}).then(res.send("Reservation deleted"));
}

