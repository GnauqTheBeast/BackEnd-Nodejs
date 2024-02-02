const express = require('express');
const router = express.Router();
const AuthController = require('../../app/controllers/admin/Auth.controller');

router.get('/logout', AuthController.logout);
router.post('/login', AuthController.loginAccount);
router.get('/login', AuthController.login);

module.exports = router;