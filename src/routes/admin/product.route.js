const express = require('express');
const router = express.Router();
const ProductController = require('../../app/controllers/admin/Product.controller');

router.get('/', ProductController.show);
router.post('/handle-form-action', ProductController.handleFormAction);
router.patch('/change-status/:status/:id', ProductController.changeStatus);

module.exports = router;