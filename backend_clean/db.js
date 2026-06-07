const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root619",
    database: "appointment_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed ❌");
        console.log(err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

module.exports = db;