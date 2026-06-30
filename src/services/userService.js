const { User } = require("../models");

// GET USER PROFILE
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

// UPDATE USER PROFILE
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
    getProfile,
    updateProfile
};