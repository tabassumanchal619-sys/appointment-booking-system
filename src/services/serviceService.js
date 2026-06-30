const { Service } = require("../models");
const { Op } = require("sequelize");

// CREATE
const createService = async (data) => {
    return await Service.create(data);
};

// GET ALL (WITH SEARCH & FILTER)
const getAllServices = async (query) => {

    const where = {};

    // Search by service name
    if (query.search) {
        where.service_name = {
            [Op.like]: `%${query.search}%`
        };
    }

    // Filter by category
    if (query.category) {
        where.categoryId = query.category;
    }

    // Filter by price
    if (query.minPrice || query.maxPrice) {

        where.price = {};

        if (query.minPrice) {
            where.price[Op.gte] = Number(query.minPrice);
        }

        if (query.maxPrice) {
            where.price[Op.lte] = Number(query.maxPrice);
        }
    }

    return await Service.findAll({
        where,
        order: [["service_name", "ASC"]]
    });

};

// GET ONE
const getServiceById = async (id) => {
    return await Service.findByPk(id);
};

// UPDATE
const updateService = async (id, data) => {

    await Service.update(data, {
        where: { id }
    });

    return await Service.findByPk(id);

};

// DELETE
const deleteService = async (id) => {
    return await Service.destroy({
        where: { id }
    });
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};