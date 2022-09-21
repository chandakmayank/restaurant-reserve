module.exports = (sequelize, Sequelize) => {
  const Reservations = sequelize.define("reservations", {
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

  return Reservations;
};