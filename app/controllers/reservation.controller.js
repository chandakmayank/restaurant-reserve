// reservation control

const db = require("../models");
const config = require("../config/auth.config");
const Tables= db.tables;
const Reservations = db.reservation

const moment = require('moment');

const Op = db.Sequelize.Op;


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

exports.checkSlots = (req,res) => {}

exports.reserveTable = (req,res) => {
    const party_size = req.body.party_size;
    const reservation_date = req.body.reservation_date;
    const start_time = req.body.start_time;
    const duration = req.body.duration;

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
                [Op.overlap]: ['2022-09-23T01:50:33.455Z','2022-09-23T01:55:33.455Z']
              }}
            }).then(overlaps => {
              res.send(overlaps)
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

