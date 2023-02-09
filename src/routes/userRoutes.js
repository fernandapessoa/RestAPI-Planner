const express = require("express");
const router = express.Router();

const userController = require('./../controllers/userController');


//ROUTERS
router
    .route("/")
    .get(userController.getAllUsers);

router
    .route("/signUp")
    .post(userController.newUser);

router
    .route("/signIn") 
    .post(userController.signIn);

module.exports = router;

