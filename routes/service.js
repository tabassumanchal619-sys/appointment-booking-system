const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE SERVICE (ADMIN)
router.post("/services", (req, res) => {
    const { name, description, duration, price } = req.body;

    const sql = "INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, description, duration, price], (err) => {
        if (err) {
            return res.status(500).send("Error creating service");
        }
        res.send("Service created successfully");
    });
});

// GET ALL SERVICES
router.get("/services", (req, res) => {
    const sql = "SELECT * FROM services";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send("Error fetching services");
        }
        res.json(results);
    });
});

module.exports = router;