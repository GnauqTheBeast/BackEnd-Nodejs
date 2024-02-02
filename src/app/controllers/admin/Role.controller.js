const Role = require('../../model/roles.model');

const RoleController = {
    // [GET] /admin/role
    show: async (req, res) => {
        let find = {
            deleted: false,
        };
        const roles = await Role.find(find);
        res.render('admin/pages/roles/index', {
            roles
        });
    },
    // [GET] /admin/role/create
    create: async (req, res) => {
        res.render('admin/pages/roles/create');
    },
    // [POST] /admin/role/create
    createRole: async (req, res) => {
        const record = new Role(req.body);
        await record.save();
        res.redirect('/admin/role');
    },
    // [GET] /admin/role/edit/:id
    edit: async (req, res) => {
        try {
            let find = {
                deleted: false,
                _id: req.params.id
            };
            const role = await Role.findOne(find);
            res.render('admin/pages/roles/edit', { role });
        } catch (error) {
            req.flash('error', 'Error !');
            res.redirect('/admin/role');            
        }
    },
    // [PATCH] /admin/role/edit/:id
    editRole: async (req, res) => {
        await Role.findOneAndUpdate({ _id: req.params.id}, req.body);
        req.flash('success', 'Success !');
        res.redirect('/admin/role');
    },
    // [GET] /admin/role/permission
    permission: async (req, res) => {
        let find = {
            deleted: false
        };
        const roles = await Role.find(find);
        res.render('admin/pages/roles/permission', { roles });
    },
    // [PATCH] /admin/role/permission
    permissionChange: async (req, res) => {
        const permissions = JSON.parse(req.body.permission);
        for(const item of permissions) {
            await Role.updateOne({ _id: item.id }, { permissions: item.permissions});
        }
        req.flash('success', 'Success !');
        res.redirect('back');
    },
};

module.exports = RoleController;