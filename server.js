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

db.sequelize.sync(
  // {force: true} 
  // use only on dev
  ).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// DB initialize with dummy data

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });

  Tables.create({
    table_no :12,
    capacity:5
  });

  Tables.create({
    table_no :124,
    capacity:9
  });
  Tables.create({
    table_no :122,
    capacity:11
  });
  Reservations.create({
    party_size: 1,
    reservation_date: new Date(),
    start_time: new Date(),
    end_time: moment(new Date()).add(30, 'm').toDate(),
    slot_range: [new Date(), moment(new Date()).add(30, 'm').toDate()],
    table: {table_no:1337, capacity:5}
  }, {
    include: [ Tables ]
  });


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
