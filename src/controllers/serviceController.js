const serviceService = require("../services/serviceService");

// CREATE
const createService = async (req, res) => {
    try {

        const service = await serviceService.createService(req.body);

        res.status(201).json({
            success: true,
            message: "Service created successfully.",
            service
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// GET ALL (SEARCH & FILTER)
const getAllServices = async (req, res) => {

    try {

        const services = await serviceService.getAllServices(req.query);

        res.status(200).json({
            success: true,
            services
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// GET ONE
const getServiceById = async (req, res) => {

    try {

        const service = await serviceService.getServiceById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.status(200).json({
            success: true,
            service
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// UPDATE
const updateService = async (req, res) => {

    try {

        const service = await serviceService.updateService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Service updated successfully.",
            service
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// DELETE
const deleteService = async (req, res) => {

    try {

        await serviceService.deleteService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Service deleted successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};