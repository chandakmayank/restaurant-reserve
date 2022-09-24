const env = process.env;

module.exports = {
  HOST:"db",
  USER: "postgres",
  PASSWORD: "123",
  DB: "postgres",
  dialect: "postgres",
  port: env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};