const User = require('../../model/users.model');
const md5 = require('md5');

const UserController = {
    // [GET] /user/sign_up
    sign_up: async(req, res) => {
        res.render('client/pages/user/sign_up');
    },
    // [GET] /user/sign_in
    sign_in: async(req, res) => {
        res.render('client/pages/user/sign_in');
    },  
    // [POST] /user/sign_up
    sign_upPost: async(req, res) => {
        const existedEmail = await User.findOne({
            email: req.body.email,
            deleted: false,
        });
        if(!existedEmail) {
            const password = req.body.password;
            req.body.password = md5(password);
            const user = new User(req.body);
            await user.save();
            res.cookie('tokenUser', user.tokenUser);
            req.flash('success', 'Register Successfully');
            res.redirect('/');
        }
        else {
            req.flash('error', `Email ${existedEmail.email} existed, try another email`);
            res.redirect('back');
        }
    },
    // [POST] /user/sign_in
    sign_inPost: async(req, res) => {
        const user = await User.findOne({
            email: req.body.email,
            deleted: false,
        });
        if(user) {
            const password = req.body.password;
            req.body.password = md5(password);
            if(req.body.password === user.password) {
                res.cookie('tokenUser', user.tokenUser);
                req.flash('success', 'Login Successfully');
                res.redirect('/');
                return;
            } 
        }
        req.flash('error', `Wrong email or password`);
        res.redirect('back');
    },
    // [GET] /user/log_out
    logout: async(req, res) => {
        res.clearCookie('tokenUser');
        req.flash('success', 'Logout account successfully');
        res.redirect('/');
    },
};

module.exports = UserController;
