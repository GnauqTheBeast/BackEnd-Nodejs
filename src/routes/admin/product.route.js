const express = require('express');
const router = express.Router();
const ProductController = require('../../app/controllers/admin/Product.controller');
const multer  = require('multer');
const upload = multer();
const validateProduct = require('../../validates/admin/product.validate');


// Middlewares
const fileUploadCloud = require('../../middlewares/admin/fileUploadCloud.middleware');
//

router.patch('/trash/restore/:id', ProductController.restore);
router.delete('/trash/destroy/:id', ProductController.destroy);
router.get('/trash', ProductController.trash);
router.get('/edit/:id', ProductController.edit);
router.get('/detail/:id', ProductController.detail);
router.patch('/edit/:id', 
    upload.single('thumbnail'),
    fileUploadCloud,
    validateProduct.createProduct,
    ProductController.editProduct);
router.patch('/delete/:id', ProductController.softDelete);
router.get('/create', ProductController.create);
router.post('/create', 
    upload.single('thumbnail'),
    fileUploadCloud,
    validateProduct.createProduct,
    ProductController.createProduct);
router.patch('/handle-form-action', ProductController.handleFormAction);
router.patch('/change-status/:status/:id', ProductController.changeStatus);
router.get('/', ProductController.show);

module.exports = router;