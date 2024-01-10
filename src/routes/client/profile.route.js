const express = require("express");
const router = express.Router();
const ProductController = require("../../app/controllers/client/ProfileController");

router.get("/thuha", ProductController.you);
router.get("/:slug", ProductController.me);

module.exports = router;
