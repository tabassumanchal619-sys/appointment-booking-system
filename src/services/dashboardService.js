const { User, Category, Service, Appointment } = require("../models");

const getDashboardStatistics = async () => {

    // Count totals
    const totalUsers = await User.count();

    const totalCategories = await Category.count();

    const totalServices = await Service.count();

    const totalAppointments = await Appointment.count();

    // Count appointments by status
    const pending = await Appointment.count({
        where: {
            status: "pending"
        }
    });

    const approved = await Appointment.count({
        where: {
            status: "approved"
        }
    });

    const completed = await Appointment.count({
        where: {
            status: "completed"
        }
    });

    const rejected = await Appointment.count({
        where: {
            status: "rejected"
        }
    });

    const cancelled = await Appointment.count({
        where: {
            status: "cancelled"
        }
    });

    return {
        totalUsers,
        totalCategories,
        totalServices,
        totalAppointments,
        pending,
        approved,
        completed,
        rejected,
        cancelled
    };

};

module.exports = {
    getDashboardStatistics
};