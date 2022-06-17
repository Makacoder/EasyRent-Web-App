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
//users logout path
router.get("/logoutUser", User.logout);

//all bookmark services path

router.post("/auth/user/verify", User.verifyEmail);
router.post("/auth/user/resend-verification-mail", User.resendVerificationMail);
router.post("/auth/user/password-reset-url", User.forgetPasswordLink);
router.patch("/auth/user/update-password", User.updatePassword);
router.patch("/auth/user/reset-password", User.resetPassword);
router.delete("/deleteHouse/:_id", User.deleteHouse);
router.patch("/auth/user/edit-profile/:_id", User.editUser);
//router.get("/auth/user/fetch-userDetails", User.loggdUserDetails);
module.exports = router;
