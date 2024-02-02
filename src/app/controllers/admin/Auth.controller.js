const Account = require('../../model/account.model');
const md5 = require('md5');

const AuthController = {
    // [GET] /admin/auth/login
    login: (req, res) => {
        res.render('admin/pages/auth/login');
    },
    // [POST] /admin/auth/login
    loginAccount: async (req, res) => {
        const {email, password} = req.body;
        const user = await Account.findOne({
            email: email,
            deleted: false,
        });
        if(user) {
            if(md5(password) != user.password) {
                req.flash('error', 'Wrong password');
                res.redirect('back');
                return;
            }
        }
        else {
            req.flash('error', 'This account does not exist');
            res.redirect('back');
            return;
        }
        res.cookie('token', user.token);
        res.redirect('/admin/dashboard');
    },
    // [GET] /admin/auth/logout
    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/admin/auth/login');
    }
}

module.exports = AuthController;