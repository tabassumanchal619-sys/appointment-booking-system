const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const {
    registerValidation,
    loginValidation
} = require("../middlewares/authValidation");

const authenticate = require("../middlewares/authMiddleware");

// Authentication
router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.post("/logout", authController.logout);

// Profile
router.get("/profile", authenticate, authController.getProfile);

router.put("/profile", authenticate, authController.updateProfile);

module.exports = router;