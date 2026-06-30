const dashboardService = require("../services/dashboardService");

// GET DASHBOARD STATISTICS
const getDashboard = async (req, res) => {

    try {

        const statistics = await dashboardService.getDashboardStatistics();

        res.status(200).json({
            success: true,
            statistics
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getDashboard
};