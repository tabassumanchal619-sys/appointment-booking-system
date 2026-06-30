const { Category } = require("../models");

// ==========================
// CREATE CATEGORY
// ==========================
const createCategory = async (data) => {

    return await Category.create(data);

};

// ==========================
// GET ALL CATEGORIES
// ==========================
const getAllCategories = async () => {

    return await Category.findAll({
        order: [["id", "ASC"]]
    });

};

// ==========================
// GET CATEGORY BY ID
// ==========================
const getCategoryById = async (id) => {

    return await Category.findByPk(id);

};

// ==========================
// UPDATE CATEGORY
// ==========================
const updateCategory = async (id, data) => {

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found.");
    }

    await category.update(data);

    return category;

};

// ==========================
// DELETE CATEGORY
// ==========================
const deleteCategory = async (id) => {

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found.");
    }

    await category.destroy();

    return true;

};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};