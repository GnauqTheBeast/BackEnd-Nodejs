const express = require('express');
const router = express.Router();
const AccountController = require('../../app/controllers/admin/Account.controller');
const multer  = require('multer');
const upload = multer();
const Validate = require('../../validates/admin/create.validate');

// Middlewares
const fileUploadCloud = require('../../middlewares/admin/fileUploadCloud.middleware');
//

router.patch('/edit/:id', 
    upload.single('avatar'),
    fileUploadCloud,
    Validate.fullName,
    Validate.email,
    AccountController.editAccount);
router.get('/edit/:id', AccountController.edit);
router.post('/create', 
    upload.single('avatar'),
    fileUploadCloud,
    Validate.fullName,
    Validate.email,
    Validate.password,
    AccountController.createAccount);
router.get('/create', AccountController.create);
router.get('/', AccountController.show);

module.exports = router;