const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/authMiddleware");
const serviceRoutes = require("./routes/service");
const db = require("./db");
console.log("Backend started") 
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", serviceRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
app.get("/api/profile", verifyToken, (req, res) => {
    res.json({
        message: "Protected route accessed successfully",
        user: req.user
    });
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});