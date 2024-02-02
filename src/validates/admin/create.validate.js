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
        next();
    },
    password: (req, res, next) => {
        if(!req.body.password) {
            req.flash('error', 'Error! Password must not be empty');
            res.redirect('back');
            return;
        }
        next();
    },
}
    
module.exports = Validate;