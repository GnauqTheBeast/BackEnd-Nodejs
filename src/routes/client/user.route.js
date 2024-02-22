const express = require("express");
const router = express.Router();
const UserController = require("../../app/controllers/client/User.controller");
const Validate = require('../../validates/client/user.validate');

// router.get("/password/forgot", UserController.forgotPass);
router.get("/logout", UserController.logout);
router.post("/sign_in", 
    Validate.email,
    UserController.sign_inPost);
router.post("/sign_up", 
    Validate.fullName,
    Validate.email,
    Validate.password,
    UserController.sign_upPost);
router.get("/sign_up", UserController.sign_up);
router.get("/sign_in", UserController.sign_in);

module.exports = router;
