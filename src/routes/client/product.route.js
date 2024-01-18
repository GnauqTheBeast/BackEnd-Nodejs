const express = require("express");
const router = express.Router();

const ProductController = require("../../app/controllers/client/Product.controller");

router.get("/:slug", ProductController.detail);
router.get("/", ProductController.show);

module.exports = router;
