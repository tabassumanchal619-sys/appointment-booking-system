const express = require("express");

const router = express.Router();

const controller = require("../controllers/appointmentController");

const protect = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

// =========================
// USER ROUTES
// =========================

// Book Appointment
router.post(
    "/",
    protect,
    controller.bookAppointment
);

// My Appointments
router.get(
    "/my",
    protect,
    controller.myAppointments
);

// Cancel Appointment
router.patch(
    "/:id/cancel",
    protect,
    controller.cancelAppointment
);

// Download Appointment Slip

router.get(
    "/:id/pdf",
    protect,
    controller.downloadAppointmentSlip
);

// =========================
// ADMIN ROUTES
// =========================

// View All Appointments
router.get(
    "/",
    protect,
    isAdmin,
    controller.getAll
);

// Approve Appointment
router.patch(
    "/:id/approve",
    protect,
    isAdmin,
    controller.approveAppointment
);

// Reject Appointment
router.patch(
    "/:id/reject",
    protect,
    isAdmin,
    controller.rejectAppointment
);

// Complete Appointment
router.patch(
    "/:id/complete",
    protect,
    isAdmin,
    controller.completeAppointment
);

// Delete Appointment
router.delete(
    "/:id",
    protect,
    isAdmin,
    controller.remove
);

module.exports = router;