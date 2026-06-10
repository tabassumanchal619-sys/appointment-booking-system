const sequelize = require("./config/db");

sequelize.authenticate()
  .then(() => {
    console.log("ORM DB Connected ✅");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });