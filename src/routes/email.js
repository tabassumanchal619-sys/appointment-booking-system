const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");
const protect = require("../middlewares/authMiddleware");

router.get("/test", protect, emailController.testEmail);

module.exports = router;