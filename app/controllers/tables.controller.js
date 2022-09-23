const db = require("../models");
const config = require("../config/auth.config");
const Tables= db.tables;
const Reservations = db.reservation;

const Op = db.Sequelize.Op;


exports.getTable = (req, res) => {
    Tables.findAll().then( tables =>{
      res.status(200).send({
          tables
        });
    }
      ).catch(err => {
      res.status(500).send({ message: err.message });
    });
};



exports.addTable = (req, res) => {
  // req.body.table_no
  // req.body.capacity
  Tables.create({
    table_no:   req.body.table_no,
    capacity: req.body.capacity
  }).then(
  res.status(200).send("succeesss")
  ).catch(err => {
      res.status(500).send({ message: err.message });
    });

  // res.status(200).send("add a table.");
};


exports.removeTable = (req, res) => {
  const table_num = req.body.table_no;
  Tables.findByPk(table_num).then( record => {
    console.log("found tables: ", record)
    Reservations.findAll({
      where: {table_no: table_num}
    }).then(reservations_active => {
      if(reservations_active.length > 0){
        res.send("Cant delete table as it has reservations attached")
      } else {
        Tables.destroy({
          where: {table_no: table_num}
        }).then( status => {
          res.send({"deleted tables":status})
        })        
      }
    })
  })
};