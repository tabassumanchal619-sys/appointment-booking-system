const sendEmail = require("../utils/mailer");
const { User } = require("../models");

const testEmail = async (req, res) => {
    try {
        // Get the logged-in user
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Send email to the logged-in user's email
        await sendEmail(
            user.email,
            "Appointment System Test Email",
            `Hello ${user.name},

Congratulations! Your Appointment Management System is now able to send emails successfully.

This is a test email.

Thank you!`
        );

        res.json({
            success: true,
            message: `Test email sent to ${user.email}`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    testEmail
};