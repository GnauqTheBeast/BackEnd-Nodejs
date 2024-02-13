const express = require("express");
const router = express.Router();
const CartController = require("../../app/controllers/client/Cart.controller");

router.get("/delete/:productId", CartController.delete);
router.get("/update/:productId/:quantity", CartController.update);
router.post("/add/:productId", CartController.add);
router.get("/", CartController.show);

module.exports = router;
