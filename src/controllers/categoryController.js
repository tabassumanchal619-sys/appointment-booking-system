const categoryService = require("../services/categoryService");

// ==========================
// CREATE CATEGORY
// ==========================
const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);

        res.status(201).json({
            message: "Category created successfully.",
            category
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// ==========================
// GET ALL CATEGORIES
// ==========================
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();

        res.status(200).json(categories);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ==========================
// GET CATEGORY BY ID
// ==========================
const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found."
            });
        }

        res.status(200).json(category);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ==========================
// UPDATE CATEGORY
// ==========================
const updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Category updated successfully.",
            category
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// ==========================
// DELETE CATEGORY
// ==========================
const deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);

        res.status(200).json({
            message: "Category deleted successfully."
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};