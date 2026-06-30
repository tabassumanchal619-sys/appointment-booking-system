const { Appointment, Service, User } = require("../models");

// ===============================
// BOOK APPOINTMENT
// ===============================
const createAppointment = async (data) => {

    // Check if service exists
    const service = await Service.findByPk(data.service_id);

    if (!service) {
        throw new Error("Service not found.");
    }

    // Prevent booking past dates
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        throw new Error("Cannot book an appointment for a past date.");
    }

    // Prevent duplicate booking
    const existingAppointment = await Appointment.findOne({
        where: {
            service_id: data.service_id,
            date: data.date,
            time: data.time
        }
    });

    if (existingAppointment) {
        throw new Error("This time slot is already booked.");
    }

    // Create appointment
    const appointment = await Appointment.create(data);

    // Return appointment with relations
    return await Appointment.findByPk(appointment.id, {
        include: [
            {
                model: User,
                attributes: ["id", "name", "email"]
            },
            {
                model: Service
            }
        ]
    });
};

// ===============================
// USER APPOINTMENTS
// ===============================
const getUserAppointments = async (userId) => {

    return await Appointment.findAll({
        where: {
            user_id: userId
        },
        include: [
            {
                model: Service
            }
        ],
        order: [
            ["date", "ASC"],
            ["time", "ASC"]
        ]
    });

};

// ===============================
// ADMIN - ALL APPOINTMENTS
// ===============================
const getAllAppointments = async () => {

    return await Appointment.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "name", "email"]
            },
            {
                model: Service
            }
        ],
        order: [
            ["date", "ASC"],
            ["time", "ASC"]
        ]
    });

};

// ===============================
// UPDATE STATUS
// ===============================
const updateStatus = async (id, status) => {

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
        throw new Error("Appointment not found.");
    }

    const validStatus = [
    "pending",
    "approved",
    "rejected",
    "completed",
    "cancelled"
];

    if (!validStatus.includes(status)) {
        throw new Error("Invalid appointment status.");
    }

    // Workflow validation
    if (appointment.status === "completed") {
        throw new Error("Completed appointments cannot be changed.");
    }

    if (appointment.status === "rejected") {
        throw new Error("Rejected appointments cannot be changed.");
    }

    if (
        appointment.status === "pending" &&
        status === "completed"
    ) {
        throw new Error("Appointment must be approved before completion.");
    }

    appointment.status = status;

    await appointment.save();

    return appointment;

};

// ===============================
// DELETE APPOINTMENT
// ===============================
const deleteAppointment = async (id) => {

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
        throw new Error("Appointment not found.");
    }

    await appointment.destroy();

    return true;

};
// ===============================
// CANCEL APPOINTMENT
// ===============================
const cancelAppointment = async (id, userId) => {

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
        throw new Error("Appointment not found.");
    }

    // User can cancel only their own appointment
    if (appointment.user_id !== userId) {
        throw new Error("You can only cancel your own appointment.");
    }

    // Only pending appointments can be cancelled
    if (appointment.status !== "pending") {
        throw new Error("Only pending appointments can be cancelled.");
    }

    appointment.status = "cancelled";

    await appointment.save();

    return appointment;
};
// ===============================
// GET APPOINTMENT FOR PDF
// ===============================
const getAppointmentForPDF = async (id) => {

    const appointment = await Appointment.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ["id", "name", "email"]
            },
            {
                model: Service
            }
        ]
    });

    if (!appointment) {
        throw new Error("Appointment not found.");
    }

    if (appointment.status !== "approved") {
        throw new Error("Only approved appointments can be downloaded.");
    }

    return appointment;
};
module.exports = {
    createAppointment,
    getUserAppointments,
    getAllAppointments,
    updateStatus,
    deleteAppointment,
    getAppointmentForPDF
};