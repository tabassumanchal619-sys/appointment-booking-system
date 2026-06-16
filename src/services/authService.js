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

    // 1. find user
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    // 2. check password
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return null;

    // 3. ACCESS TOKEN (short life → API access)
    const accessToken = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role   // ✅ ADD THIS LINE
  },
  process.env.JWT_ACCESS_SECRET,
  {
    expiresIn: "15m"
  }
);

    // 4. REFRESH TOKEN (long life → cookie + DB)
    const refreshToken = jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d"
        }
    );

    // 5. STORE REFRESH TOKEN IN DATABASE
    user.refreshToken = refreshToken;
    await user.save();

    // 6. RETURN BOTH TOKENS
    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
};

module.exports = {
    registerUser,
    loginUser
};