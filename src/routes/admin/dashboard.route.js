const express = require('express');
const router = express.Router();
const DashboardController = require('../../app/controllers/admin/DashboardController');

router.get('/', DashboardController.show);

module.exports = router;