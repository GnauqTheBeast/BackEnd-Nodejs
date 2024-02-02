const express = require('express');
const router = express.Router();
const RoleController = require('../../app/controllers/admin/Role.controller');

router.patch('/permission', RoleController.permissionChange);
router.get('/permission', RoleController.permission);
router.patch('/edit/:id', RoleController.editRole);
router.get('/edit/:id', RoleController.edit);
router.post('/create', RoleController.createRole);
router.get('/create', RoleController.create);
router.get('/', RoleController.show);

module.exports = router;