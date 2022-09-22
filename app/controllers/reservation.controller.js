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