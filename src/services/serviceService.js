const { Service } = require("../models");

// CREATE
const createService = async (data) => {
  return await Service.create(data);
};

// GET ALL
const getAllServices = async () => {
  return await Service.findAll();
};

// GET ONE
const getServiceById = async (id) => {
  return await Service.findByPk(id);
};

// UPDATE
const updateService = async (id, data) => {
  return await Service.update(data, { where: { id } });
};

// DELETE
const deleteService = async (id) => {
  return await Service.destroy({ where: { id } });
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};