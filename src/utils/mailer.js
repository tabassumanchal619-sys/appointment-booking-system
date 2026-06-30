const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send Email Function
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("✅ Email sent:", info.response);

        return info;

    } catch (error) {

        console.error("❌ Email Error:", error);

        throw error;
    }
};

module.exports = sendEmail;