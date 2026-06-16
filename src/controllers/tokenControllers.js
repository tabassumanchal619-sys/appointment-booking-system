const jwt = require("jsonwebtoken");
const { User } = require("../models");

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No refresh token"
            });
        }

        // verify refresh token
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await User.findByPk(decoded.id);

        if (!user || user.refreshToken !== token) {
            return res.status(403).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        // create new access token
        const newAccessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "15m" }
        );

        res.json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    refreshToken
};