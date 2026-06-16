const serviceService = require("../services/serviceService");

// CREATE
const createService = async (req, res) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
const getServiceById = async (req, res) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateService = async (req, res) => {
  try {
    await serviceService.updateService(req.params.id, req.body);
    res.json({ message: "Service updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteService = async (req, res) => {
  try {
    await serviceService.deleteService(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};