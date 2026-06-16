const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");

// CREATE
router.post("/", serviceController.createService);

// GET ALL
router.get("/", serviceController.getAllServices);

// GET ONE
router.get("/:id", serviceController.getServiceById);

// UPDATE
router.put("/:id", serviceController.updateService);

// DELETE
router.delete("/:id", serviceController.deleteService);

module.exports = router;