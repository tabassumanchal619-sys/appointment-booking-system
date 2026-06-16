const { Sequelize } = require("sequelize");
require("dotenv").config(); // important if not already in app.js

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

module.exports = sequelize;