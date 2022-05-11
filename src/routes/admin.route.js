const express = require("express");
const Admin = require("../controllers/admin.controller");
const router = express.Router();
const { authorize, isAdmin } = require("../middleware/auth.middleware");
//Admin sign up path
router.post("/registerAdmin", Admin.register);
//Admin login path
router.post("/loginAdmin", Admin.login);
//Admin auth with jwt
router.get("/getAllUsers", authorize, isAdmin, Admin.getAllUsers);
//Admin auth with jwt
router.post("/uploadHouse", authorize, isAdmin, Admin.uploadHouse);

module.exports = router;
