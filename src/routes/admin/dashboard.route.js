const express = require('express');
const router = express.Router();
const DashboardController = require('../../app/controllers/admin/Dashboard.controller');

router.get('/', DashboardController.show);

module.exports = router;