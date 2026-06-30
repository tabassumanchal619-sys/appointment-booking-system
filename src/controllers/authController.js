const { validationResult } = require("express-validator");
const authService = require("../services/authService");

// REGISTER
const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        const user = await authService.registerUser(name, email, password);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// LOGIN
const login = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const result = await authService.loginUser(email, password);

        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const { accessToken, refreshToken, user } = result;

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
};

// LOGOUT
const logout = async (req, res) => {

    res.clearCookie("refreshToken");

    res.json({
        success: true,
        message: "Logged out successfully."
    });

};

// GET PROFILE
const getProfile = async (req, res) => {

    try {

        const user = await authService.getProfile(req.user.id);

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

// UPDATE PROFILE
const updateProfile = async (req, res) => {

    try {

        const user = await authService.updateProfile(
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    register,
    login,
    logout,
    getProfile,
    updateProfile
};