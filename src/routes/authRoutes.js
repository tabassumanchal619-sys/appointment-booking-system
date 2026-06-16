const express = require("express");
const router = express.Router();

const {
  registerValidation,
  loginValidation
} = require("../middlewares/authValidation");

const authController = require("../controllers/authController");

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);

module.exports = router;