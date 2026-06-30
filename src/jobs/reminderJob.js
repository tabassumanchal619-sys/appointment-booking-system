const cron = require("node-cron");
const { Op } = require("sequelize");
const { Appointment, User, Service } = require("../models");
const sendEmail = require("../utils/mailer");

// Run every day at 9:00 AM
cron.schedule("0 9 * * *", async () => {
    console.log("📧 Running appointment reminder job...");

    try {
        // Calculate tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dateString = tomorrow.toISOString().split("T")[0];

        // Find approved appointments for tomorrow
        const appointments = await Appointment.findAll({
            where: {
                status: "approved",
                date: dateString
            },
            include: [
                {
                    model: User,
                    attributes: ["name", "email"]
                },
                {
                    model: Service,
                    attributes: ["service_name"]
                }
            ]
        });

        // Send reminder email to each user
        for (const appointment of appointments) {

            await sendEmail(
                appointment.User.email,
                "Appointment Reminder",
                `Dear ${appointment.User.name},

This is a reminder that your appointment is tomorrow.

Service: ${appointment.Service.service_name}
Date: ${appointment.date}
Time: ${appointment.time}

Thank you!`
            );

            console.log(`✅ Reminder sent to ${appointment.User.email}`);
        }

    } catch (error) {
        console.error("Reminder Job Error:", error.message);
    }
});