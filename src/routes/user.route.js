const express = require("express");
const User = require("../controllers/user.controller");
const router = express.Router();
const { authorize } = require("../middleware/auth.middleware");

//users sign up path
router.post("/registerUser", User.register);
//users login path
router.post("/loginUser", User.login);
//fetch users path
router.get("/viewAllUser", authorize, User.fetchAllUsers);
//all bookmark services path

router.post("/auth/user/verify", User.verifyEmail);
router.post("/auth/user/resend-verification-mail", User.resendVerificationMail);
router.post("/auth/user/password-reset-url", User.forgetPasswordLink);
router.patch("/auth/user/change-password", User.changePassword);
router.patch("/auth/user/reset-password", User.resetPassword);
module.exports = router;
