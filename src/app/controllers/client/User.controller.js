const User = require('../../model/users.model');
const forgotPassword = require('../../model/forgot-password.model');
const md5 = require('md5');
const randomOTPHelper = require('../../helpers/generate.helper');
const emailOtpHelper = require('../../helpers/otp.helper');

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
                res.clearCookie('cartId');
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
        res.clearCookie('cartId');
        req.flash('success', 'Logout account successfully');
        res.redirect('/');
    },
    // [GET] /user/forgot/password
    forgotPass: async(req, res) => {
        res.render('client/pages/user/forgot');
    },
    // [POST] /user/forgot/password
    forgotPassPost: async(req, res) => {
        const existedEmail = await User.findOne({ 
            email: req.body.email,
            deleted: false,
        });
        if(!existedEmail) {
            req.flash('error', 'This email is not exist');
            res.redirect('back');
            return;
        }
        // OTP
        const forgotPasswordObj = {
            email: req.body.email,
            otp: randomOTPHelper(6),
        };
        // Delete existed OTP first
        await forgotPassword.findOneAndDelete({ email: req.body.email });
        const OTP = new forgotPassword(forgotPasswordObj);
        const passwordRecoveryRecord = await OTP.save();
        
        const subject = 'Change Password';
        const html = `
            <h2>OTP: <b>${passwordRecoveryRecord.otp}</b></h2>
            <div>Expire time is 2 minute !</div>
        `;
        emailOtpHelper(req.body.email, subject, html);

        req.flash('success', 'OTP is being sent to your email, please check !');
        res.redirect(`/user/password/otp?email=${req.body.email}`);
    },
    // [GET] /user/password/otp
    otp: async(req, res) => {
        const userEmail = req.query.email;
        res.render('client/pages/user/otp', {
            userEmail,
        });
    },
    // [POST] /user/password/otp
    otpPost: async(req, res) => {
        const passwordRecovery = await forgotPassword.findOne({ email: req.body.email });
        if(req.body.otp != passwordRecovery.otp) {
            req.flash('error', 'Wrong OTP, please try again');
            res.redirect('back');
            return;
        }
        else {
            const user = await User.findOne({ email: req.body.email });
            res.cookie('tokenUser', user.tokenUser);
            res.redirect('/user/password/change');
            return;
        }
    },
    // [GET] /user/password/change
    changePassword: async(req, res) => {
        res.render('client/pages/user/change-password');
    },
    // [POST] /user/password/change
    changePasswordPost: async(req, res) => {
        const newPassword = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if(newPassword != confirmPassword) {
            req.flash('error', 'Password and Confirm Password is not match up');
            res.redirect('back');
            return;
        }
        else {
            const user = await User.findOne({ tokenUser:  req.cookies.tokenUser });
            await User.updateOne({
                tokenUser:  req.cookies.tokenUser
            }, {
                password: md5(newPassword)
            });
            req.flash('success', 'Password changed successfully');
            res.redirect('/');
        }
    },
};

module.exports = UserController;
