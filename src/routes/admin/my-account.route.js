const express = require('express');
const router = express.Router();
const MyAccountController = require('../../app/controllers/admin/MyAccount.controller');

router.get('/', MyAccountController.show);

module.exports = router;