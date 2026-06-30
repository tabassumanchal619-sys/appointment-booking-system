const appointmentService = require("../services/appointmentService");
const generateAppointmentSlip = require("../pdf/appointmentSlip");
// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
    try {

        const appointment = await appointmentService.createAppointment({
            user_id: req.user.id,
            ...req.body
        });

        res.status(201).json({
            message: "Appointment booked successfully.",
            appointment
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }
};

// USER APPOINTMENTS
const myAppointments = async (req, res) => {

    try {

        const appointments = await appointmentService.getUserAppointments(req.user.id);

        res.status(200).json({
            appointments
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ADMIN - ALL APPOINTMENTS
const getAll = async (req, res) => {

    try {

        const appointments = await appointmentService.getAllAppointments();

        res.status(200).json({
            appointments
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// APPROVE
const approveAppointment = async (req, res) => {

    try {

        const appointment = await appointmentService.updateStatus(
            req.params.id,
            "approved"
        );

        res.status(200).json({
            message: "Appointment approved successfully.",
            appointment
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

// REJECT
const rejectAppointment = async (req, res) => {

    try {

        const appointment = await appointmentService.updateStatus(
            req.params.id,
            "rejected"
        );

        res.status(200).json({
            message: "Appointment rejected successfully.",
            appointment
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

// COMPLETE
const completeAppointment = async (req, res) => {

    try {

        const appointment = await appointmentService.updateStatus(
            req.params.id,
            "completed"
        );

        res.status(200).json({
            message: "Appointment completed successfully.",
            appointment
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

// CANCEL
const cancelAppointment = async (req, res) => {

    try {

        const appointment = await appointmentService.cancelAppointment(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            message: "Appointment cancelled successfully.",
            appointment
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

// DELETE
const remove = async (req, res) => {

    try {

        await appointmentService.deleteAppointment(req.params.id);

        res.status(200).json({
            message: "Appointment deleted successfully."
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};
// DOWNLOAD APPOINTMENT PDF
const downloadAppointmentSlip = async (req, res) => {

    try {

        const appointment =
            await appointmentService.getAppointmentForPDF(req.params.id);

        generateAppointmentSlip(appointment, res);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};
module.exports = {

    bookAppointment,
    myAppointments,
    getAll,

    approveAppointment,
    rejectAppointment,
    completeAppointment,
    cancelAppointment,

    downloadAppointmentSlip,

    remove

};