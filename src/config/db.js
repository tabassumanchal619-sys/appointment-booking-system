const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "appointment_db",   // database name
  "root",             // mysql username
  "root619",                 // mysql password (put yours if any)
  {
    host: "localhost",
    dialect: "mysql",
    logging: false
  }
);

module.exports = sequelize;