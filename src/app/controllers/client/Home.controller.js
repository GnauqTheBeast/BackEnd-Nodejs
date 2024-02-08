const HomeController = {
    // [GET] /
    show: async (req, res) => {
        res.render('client/pages/home/index');
    }
};

module.exports = HomeController;
