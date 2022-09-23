const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.port,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// gather all DB models
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.tables = require("../models/tables.model.js")(sequelize,Sequelize);
db.reservation = require("../models/reservation.model.js")(sequelize,Sequelize);


// Assosiation between user and roles table
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

// Associate reservations to tables

// db.tables.hasMany(db.reservation, {as: 'reserveID'});
// const Reserved_Tables = sequelize.define('reserved_tables', {});

db.tables.belongsTo(db.reservation, { 
  through: "reserved_table",
  // as: "table_no_reserved",
  // foreignKey: "reservation_uid"
});

db.reservation.belongsTo(db.tables, {
  through: "reserved_tables",
  // uniqueKey: 'my_custom_unique',
  // as: "no_table",
  foreignKey: "table_no"
});

// Foreign key reservations to username




module.exports = db;
