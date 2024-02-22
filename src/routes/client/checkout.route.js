const express = require("express");
const router = express.Router();
const CheckoutController = require("../../app/controllers/client/Checkout.controller");

router.get("/success/:orderId", CheckoutController.success);
router.post("/order", CheckoutController.purchase);
router.get("/", CheckoutController.show);

module.exports = router;
