const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// PUBLIC
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);

// ADMIN ONLY
router.post("/", protect, isAdmin, serviceController.createService);
router.put("/:id", protect, isAdmin, serviceController.updateService);
router.delete("/:id", protect, isAdmin, serviceController.deleteService);

module.exports = router;