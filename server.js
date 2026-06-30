require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/routes/auth");
const serviceRoutes = require("./src/routes/service");
const appointmentRoutes = require("./src/routes/appointment");
const categoryRoutes = require("./src/routes/category");
const dashboardRoutes = require("./src/routes/dashboard");
const emailRoutes = require("./src/routes/email");

const verifyToken = require("./src/middlewares/authMiddleware");
const db = require("./src/models");

// ✅ Start Reminder Job
require("./src/jobs/reminderJob");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});

// =====================
// Routes
// =====================

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/email", emailRoutes);

// =====================
// Test Routes
// =====================

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running"
    });
});

// =====================
// Protected Route
// =====================

app.get("/api/profile", verifyToken, (req, res) => {
    res.json({
        message: "Protected route accessed successfully",
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("✅ Database connected successfully");

        await db.sequelize.sync();
        console.log("✅ Database synced successfully");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log("📧 Appointment Reminder Job Started...");
        });

    } catch (err) {
        console.error("❌ Database connection failed:", err);
    }
};

startServer();