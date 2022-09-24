module.exports = (sequelize, Sequelize) => {
  const Tables = sequelize.define("tables", {
    table_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: {
          args: true,
          msg: 'username already in use!'
      },
      primaryKey: true
    },
    capacity: {
      type: Sequelize.INTEGER
    },
    reservation_uid: {
      type: Sequelize.UUID
    }
  });

  return Tables;
};