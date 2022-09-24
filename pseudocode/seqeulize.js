// seqeulize operations and queries

const moment = require("moment")
const config = require("../app/config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.port,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

// const db = {};

sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  // initial();

  sequelize.define("reservations", {
    reservation_id: {
    	type: Sequelize.INTEGER,
    	primaryKey: true,
    	allowNull: false
    },
    table_no: {
      type: Sequelize.INTEGER,
    },
    party_size: {
      type: Sequelize.INTEGER
    },
    reservation_date: {
    	type: Sequelize.DATEONLY
    },
    start_time: {
    	type: Sequelize.DATE
    },
    end_time: {
    	type: Sequelize.DATE
    },
    slot_range: {
    	type: Sequelize.RANGE (Sequelize.DATE)
    },
    username: {
    	type: Sequelize.INTEGER
    }
  });
});




// Models

// module.exports = (sequelize, Sequelize) => {
//   const Reservations = sequelize.define("reservations", {
//     reservation_id: {
//     	type: Sequelize.INTEGER,
//     	primaryKey: true,
//     	allowNull: false
//     },
//     table_no: {
//       type: Sequelize.INTEGER,
//     },
//     party_size: {
//       type: Sequelize.INTEGER
//     },
//     reservation_date: {
//     	type: Sequelize.DATEONLY
//     },
//     start_time: {
//     	type: Sequelize.DATE
//     },
//     end_time: {
//     	type: Sequelize.DATE
//     },
//     slot_range: {
//     	type: Sequelize.RANGE (Sequelize.DATE)
//     },
//     username: {
//     	type: Sequelize.INTEGER
//     }
//   });

//   return Reservations;
// };

// module.exports = (sequelize, Sequelize) => {
//   const Tables = sequelize.define("tables", {
//     table_no: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       unique: {
//           args: true,
//           msg: 'username already in use!'
//       },
//       primaryKey: true
//     },
//     capacity: {
//       type: Sequelize.INTEGER
//     }
//   });

//   return Tables;
// };


// // Assosiation between user and roles table
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

// db.ROLES = ["user", "admin"];

// // Associate reservations to tables
// // db.tables.hasMany(db.reservation, {as: 'reserveID'});
// // const Reserved_Tables = sequelize.define('reserved_tables', {});

// db.tables.belongsToMany(db.reservation, { 
//   through: "reserved_tables",
//   uniqueKey: 'my_custom_unique',
//   as: "table_no_reserved",
//   foreignKey: "Table_table_no"
// });

// db.reservation.belongsToMany(db.tables, {
//   through: "reserved_tables",
//   uniqueKey: 'my_custom_unique',
//   as: "reservation_no_table",
//   foreignKey: "RSRV_reservation_id"
// });

// db.tables.create({
//   table_no:5,
//   capacity: 9
// })