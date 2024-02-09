const express = require("express");
const router = express.Router();

const ProductController = require("../../app/controllers/client/Product.controller");

router.get("/:slugCategory", ProductController.category);
router.get("/detail/:slug", ProductController.detail);
router.get("/", ProductController.show);

module.exports = router;
