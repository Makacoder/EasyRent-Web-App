const express = require("express");
const User = require("../controllers/user.controller");
const router = express.Router();
const { authorize } = require("../middleware/auth.middleware");

//users sign up path
router.post("/registerUser", User.register);
//users login path
router.post("/loginUser", User.login);
//fetch users path
router.get("/registeredUser", authorize, User.registeredUsers);
//all bookmark services path
router.get("/getAllServices", authorize, User.getAllServices);

module.exports = router;
