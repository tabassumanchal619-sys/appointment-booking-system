const express = require("express");
const router = express.Router();

const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("AUTH FILE LOADED");

// REGISTER
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err) => {
        if (err) return res.status(500).send("Error registering user");
        res.send("User registered successfully");
    });
});

// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).send("Database error");

        if (results.length === 0) {
            return res.status(401).send("User not found");
        }

        const user = results[0];

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Invalid password");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            "mySecretKey",
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token
        });
    });
});

module.exports = router;