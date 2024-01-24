const ValidateProductCategory = {
    createProductCategory: (req, res, next) => {
        if(!req.body.title) {
            req.flash('error', 'Error! Title must not be empty');
            res.redirect('back');
            return;
        }
        next();
    },
}

module.exports = ValidateProductCategory;