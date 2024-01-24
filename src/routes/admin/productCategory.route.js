const express = require('express');
const router = express.Router();
const ProductCategoryController = require('../../app/controllers/admin/ProductCategory.controller');
const multer  = require('multer');
const upload = multer();
const ValidateProductCategory = require('../../validates/admin/productCategory.validate');

// Middlewares
const fileUploadCloud = require('../../middlewares/admin/fileUploadCloud.middleware');
//

router.post('/create', 
    upload.single('thumbnail'),
    fileUploadCloud,
    ValidateProductCategory.createProductCategory,
    ProductCategoryController.createCategory
    );
router.get('/create', ProductCategoryController.create);
router.get('/', ProductCategoryController.show);


module.exports = router;