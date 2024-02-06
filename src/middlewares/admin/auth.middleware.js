const Account = require('../../app/model/account.model');
const Role = require('../../app/model/roles.model');

const AuthMiddleware = {
    login: async (req, res, next) => {
        if(req.cookies.token) {
            const user = await Account.findOne({
                token: req.cookies.token, 
                deleted: false,
            });
            if(!user) {
                res.redirect('/admin/auth/login');
            }
            else {
                const role = await Role.findOne({
                    _id: user.role_id, 
                    deleted: false, 
                }).select('title permissions');
                res.locals.role = role;
                res.locals.user = user;
                next();
            }
        }
        else {
            res.redirect('/admin/auth/login');
        }
    }
};

module.exports = AuthMiddleware;