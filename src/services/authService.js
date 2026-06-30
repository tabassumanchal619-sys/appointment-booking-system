const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (name, email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
};

// LOGIN (TOKEN PAIR)
const loginUser = async (email, password) => {

    // Find user
    const user = await User.findOne({
        where: { email }
    });

    if (!user) return null;

    // Check password
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return null;

    // Access Token
    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: "15m"
        }
    );

    // Refresh Token
    const refreshToken = jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d"
        }
    );

    // Save Refresh Token
    user.refreshToken = refreshToken;
    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

// GET PROFILE
const getProfile = async (userId) => {

    const user = await User.findByPk(userId, {
        attributes: {
            exclude: ["password", "refreshToken"]
        }
    });

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
};

// UPDATE PROFILE
const updateProfile = async (userId, data) => {

    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    await user.update({
        name: data.name,
        email: data.email
    });

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
};