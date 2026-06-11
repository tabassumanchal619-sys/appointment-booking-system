const authService = require("../services/authService");

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await authService.registerUser(name, email, password);

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await authService.loginUser(email, password);

        if (!token) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login
};