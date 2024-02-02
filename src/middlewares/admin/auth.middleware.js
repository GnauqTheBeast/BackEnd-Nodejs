const Account = require('../../app/model/account.model');

const AuthMiddleware = {
    login: (req, res, next) => {
        if(req.cookies.token) {
            Account.findOne({
                token: req.cookies.token, 
                deleted: false,
            })
                .then(() => next())
                .catch(() => res.redirect('/admin/auth/login'));
        }
        else {
            res.redirect('/admin/auth/login');
        }
    }
};

module.exports = AuthMiddleware;