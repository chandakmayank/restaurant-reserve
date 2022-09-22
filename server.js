const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const moment = require("moment")

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// DB connection initialize
const db = require("./app/models");
const Role = db.role;
const Tables = db.tables;
const Reservations = db.reservation;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// DB initialize with dummy data

function initial() {
  Role.create({
    roleId: 1,
    name: "user"
  });
 
  Role.create({
    roleId: 2,
    name: "admin"
  });
  Tables.create({
    table_no: 1,
    capacity: 5
  });
  Reservations.create({
    reservation_id: 1337,
    table_no: 1,
    party_size: 1,
    reservation_date: new Date(),
    start_time: new Date(),
    end_time: moment(new Date()).add(30, 'm').toDate(),
    slot_range: [new Date(), moment(new Date()).add(30, 'm').toDate()],
    username: 1234
    
  })
}

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to M reservation application." });
});


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/tables.routes')(app);
require('./app/routes/reservation.routes')(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
