const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

const protect = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

// ==================================
// PUBLIC ROUTES
// ==================================

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get category by ID
router.get("/:id", categoryController.getCategoryById);

// ==================================
// ADMIN ROUTES
// ==================================

// Create category
router.post(
    "/",
    protect,
    isAdmin,
    categoryController.createCategory
);

// Update category
router.put(
    "/:id",
    protect,
    isAdmin,
    categoryController.updateCategory
);

// Delete category
router.delete(
    "/:id",
    protect,
    isAdmin,
    categoryController.deleteCategory
);

module.exports = router;