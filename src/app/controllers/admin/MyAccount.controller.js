const Account = require('../../model/account.model');
const Role = require('../../model/roles.model');
const md5 = require('md5');

const MyAccountController = {
    // [GET] /admin/my-account
    show: async (req, res) => {
        res.render('admin/pages/my-account/index');
    },
};

module.exports = MyAccountController;