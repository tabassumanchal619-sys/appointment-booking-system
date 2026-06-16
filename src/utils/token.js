const jwt = require("jsonwebtoken");

// ACCESS TOKEN
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        }
    );
};

// REFRESH TOKEN
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES
        }
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};