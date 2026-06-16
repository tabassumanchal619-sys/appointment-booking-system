require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/routes/auth");
const serviceRoutes = require("./src/routes/service");
const verifyToken = require("./src/middlewares/authMiddleware");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});
/**
 * ROUTES
 * FIX: correct route mounting for auth
 */
app.use("/api/auth", authRoutes);
app.use("/api/services", require("./src/routes/service"));
app.use("/api/appointments", require("./src/routes/appointment"));

/**
 * TEST ROUTES
 */
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running"
    });
});

/**
 * PROTECTED ROUTE
 */
app.get("/api/profile", verifyToken, (req, res) => {
    res.json({
        message: "Protected route accessed successfully",
        user: req.user
    });
});

/**
 * START SERVER AFTER DB CONNECTION
 */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await db.authenticate();
        console.log("Database connected successfully");

        await db.sync({ alter: true });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Database connection failed:", err);
    }
};

startServer();