const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const protect = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

// ADMIN DASHBOARD
router.get(
    "/",
    protect,
    isAdmin,
    dashboardController.getDashboard
);

module.exports = router;