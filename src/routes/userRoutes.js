const express = require("express");
const router = express.Router();

//const userController = require('./../controllers/userController');
const { getAllUsers, validUser, validEmail, validPassword, newUser, signIn } = require('./../controllers/userController');


//ROUTERS
router
    .route("/")
    .get(getAllUsers);

router
    .route("/signUp")
    .post(validUser, validEmail, validPassword, newUser);

router
    .route("/signIn") 
    .post(signIn);

module.exports = router;

