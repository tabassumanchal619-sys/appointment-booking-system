const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).send("Token required");
    }

    try {
        const decoded = jwt.verify(token, "mySecretKey");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
};

module.exports = verifyToken;