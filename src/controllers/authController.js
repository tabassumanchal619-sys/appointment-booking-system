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
console.log("LOGIN RESULT FROM SERVICE:", result);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const { accessToken, refreshToken, user } = result;

        // ✅ RETURN BOTH TOKENS IN POSTMAN
        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
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
const logout = async (req, res) => {
    res.clearCookie("refreshToken");

    return res.json({
        success: true,
        message: "Logged out"
    });
};
module.exports = {
    register,
    login,
logout
};