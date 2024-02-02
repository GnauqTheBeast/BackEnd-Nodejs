const Account = require('../../model/account.model');
const Role = require('../../model/roles.model');
const md5 = require('md5');

const AccountController = {
    // [GET] /admin/account
    show: async (req, res) => {
        let find = {
            deleted: false,
        };
        const accounts = await Account.find(find);
        for(const acc of accounts) {
            try {
                const role = await Role.findOne({
                    _id: acc.role_id, 
                    deleted: false, 
                });
                acc.role = role;
            } catch (error) {
            }
        }
        res.render('admin/pages/account/index', {
            accounts
        });
    },
    // [GET] /admin/account/create
    create: async (req, res) => {
        const roles = await Role.find({deleted: false}).select('--password --token');
        res.render('admin/pages/account/create', {
            roles
        });
    },
    // [POST] /admin/account/create
    createAccount: async (req, res) => {
        const existedEmail = await Account.findOne({
            email: req.body.email,
            deleted: false,
        });
        if(!existedEmail) {
            const password = req.body.password;
            req.body.password = md5(password);
            const account = new Account(req.body);
            await account.save();
            res.redirect('../account');
        }
        else {
            req.flash('error', `Email ${existedEmail.email} existed, try another email`);
            res.redirect('back');
        }
    },
    // [GET] /admin/account/edit/:id
    edit: async (req, res) => {
        try {
            const roles = await Role.find({deleted: false});
            const account = await Account.findOne({_id: req.params.id});
            res.render('admin/pages/account/edit', {
                account,
                roles,
            })
        } catch (error) {
        }
    },
    // [PATCH] /admin/account/edit/:id
    editAccount: async (req, res) => {
        const existedEmail = await Account.findOne({
            _id: { $ne: req.params.id},
            email: req.body.email,
            deleted: false, 
        });
        if(!existedEmail) {
            if(!req.body.password) {
                delete req.body.password;
            }
            else {
                req.body.password = md5(req.body.password);
            }
            await Account.updateOne({ _id: req.params.id }, req.body);
            req.flash('success', 'Successfully changed');
            res.redirect('/admin/account');
        }
        else {
            req.flash('error', `Email ${existedEmail.email} existed, try another email`);
            res.redirect('back');
        }
    },
};

module.exports = AccountController;