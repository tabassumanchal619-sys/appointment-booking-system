const { Appointment, Service } = require("../models");

// BOOK APPOINTMENT
const createAppointment = async (data) => {

  // ❌ check valid service
  const service = await Service.findByPk(data.service_id);
  if (!service) throw new Error("Invalid service");

  // ❌ no duplicate booking
  const existing = await Appointment.findOne({
    where: {
      service_id: data.service_id,
      date: data.date,
      time: data.time
    }
  });

  if (existing) {
    throw new Error("Slot already booked");
  }

  // ❌ no past booking
  const selectedDate = new Date(data.date);
  const today = new Date();

  if (selectedDate < today.setHours(0,0,0,0)) {
    throw new Error("Cannot book past date");
  }

  return await Appointment.create(data);
};

// USER APPOINTMENTS
const getUserAppointments = async (userId) => {
  return await Appointment.findAll({ where: { user_id: userId } });
};

// ADMIN ALL
const getAllAppointments = async () => {
  return await Appointment.findAll();
};

// UPDATE STATUS
const updateStatus = async (id, status) => {
  return await Appointment.update({ status }, { where: { id } });
};

// DELETE
const deleteAppointment = async (id) => {
  return await Appointment.destroy({ where: { id } });
};

module.exports = {
  createAppointment,
  getUserAppointments,
  getAllAppointments,
  updateStatus,
  deleteAppointment
};