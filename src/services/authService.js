const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER LOGIC
const registerUser = async (name, email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
};

// LOGIN LOGIC
const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return null;

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return token;
};

module.exports = {
    registerUser,
    loginUser
};