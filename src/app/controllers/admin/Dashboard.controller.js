const DashboardController = {
    show: (req, res, next) => {
        res.render('./admin/pages/dashboard/index');
    }
}

module.exports = DashboardController;