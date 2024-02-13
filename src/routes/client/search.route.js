const express = require("express");
const router = express.Router();
const SearchController = require("../../app/controllers/client/Search.controller");

router.get("/", SearchController.show);

module.exports = router;
