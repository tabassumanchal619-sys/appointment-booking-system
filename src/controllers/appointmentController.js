const appointmentService = require("../services/appointmentService");

// BOOK
const bookAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment({
      user_id: req.user.id,
      ...req.body
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// USER APPOINTMENTS
const myAppointments = async (req, res) => {
  const data = await appointmentService.getUserAppointments(req.user.id);
  res.json(data);
};

// ADMIN ALL
const getAll = async (req, res) => {
  const data = await appointmentService.getAllAppointments();
  res.json(data);
};

// STATUS UPDATE
const updateStatus = async (req, res) => {
  await appointmentService.updateStatus(req.params.id, req.body.status);
  res.json({ message: "Status updated" });
};

// DELETE
const remove = async (req, res) => {
  await appointmentService.deleteAppointment(req.params.id);
  res.json({ message: "Deleted" });
};

module.exports = {
  bookAppointment,
  myAppointments,
  getAll,
  updateStatus,
  remove
};