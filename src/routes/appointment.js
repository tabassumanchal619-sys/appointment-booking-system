const express = require("express");
const router = express.Router();

const controller = require("../controllers/appointmentController");
const protect = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

// USER
router.post("/", protect, controller.bookAppointment);
router.get("/my", protect, controller.myAppointments);
router.delete("/:id", protect, controller.remove);

// ADMIN
router.get("/", protect, isAdmin, controller.getAll);
router.put("/:id/status", protect, isAdmin, controller.updateStatus);

module.exports = router;