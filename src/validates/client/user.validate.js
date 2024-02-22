const Validate = {
    fullName: (req, res, next) => {
        if(!req.body.fullName) {
            req.flash('error', 'Error! Full Name must not be empty');
            res.redirect('back');
            return;
        }
        next();
    },
    email: (req, res, next) => {
        if(!req.body.email) {
            req.flash('error', 'Error! Email must not be empty');
            res.redirect('back');
            return;
        }
        const isEmail = String(req.body.email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if(!isEmail) {
            req.flash('error', 'Error! This is not email');
            res.redirect('back');
            return; 
        }
        next();
    },
    password: (req, res, next) => {
        const password = req.body.password;
        if(!password) {
            req.flash('error', 'Error! Password must not be empty');
            res.redirect('back');
            return;
        }
        if (password.length < 8) {
            req.flash('error', 'Your password must be at least 8 characters');
            res.redirect('back');
            return;
        }
        if (password.search(/[a-z]/i) < 0) {
            req.flash('error', 'Your password must contain at least one letter.');
            res.redirect('back');
            return;
        }
        if (password.search(/[0-9]/) < 0) {
            req.flash('error', 'Your password must contain at least one digit.');
            res.redirect('back');
            return;
        }
        next();
    },
}
    
module.exports = Validate;