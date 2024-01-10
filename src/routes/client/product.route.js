const express = require("express");
const router = express.Router();

const ProductController = require("../../app/controllers/client/ProductController");

router.get("/mycar", ProductController.mycar);
router.get("/yourcar", ProductController.yourcar);

module.exports = router;
