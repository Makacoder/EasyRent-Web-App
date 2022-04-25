const jwt = require("jsonwebtoken");
require("dotenv").config();

//user authentication
exports.authorize = async (req, res, next) => {
  try {
    let authorizationArr = req.headers.authorization.split(" ");
    if (!authorizationArr.includes("Bearer")) {
      return res.status(401).json({
        message: "Token required to start with Bearer...",
      });
    }
    let token = authorizationArr[1];
    if (!token) {
      return res.status(401).json({
        message: "Token is required...",
      });
    }
    const decryptToken = await jwt.verify(token, process.env.rent_Token, {
      expiresIn: "5h",
    });
    req.user = decryptToken;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//user authorzation
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "User") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "User does not have access to this resource",
      });
    }
  } catch (error) {}
};
