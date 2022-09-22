// reservation control

const db = require("../models");
const config = require("../config/auth.config");
const Tables= db.tables;
const Reservations = db.reservation

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

}

exports.getCalendar = (req,res) => {}

exports.cancelReservation = (req,res) => {	
	Reservations.destroy({
	  where: { reservation_id: req.body.reservation_id }
	}).then(res.send("Reservation deleted"));
}

