const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");
require("dotenv").config();
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validation.middleware");

const rent_Token = process.env.rent_Token;

// New users sign up on the platform
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, role } =
      req.body;
    await validateRegister.validateAsync(req.body);
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "kindly fill the required field",
      });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(401).json({
        success: false,
        message: "email already exists, Please login",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
      role,
    });
    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = await jwt.sign(payload, process.env.rent_Token, {
      expiresIn: "2h",
    });
    let mailOptions = {
      to: newUser.email,
      subject: "Verify Email",
      text: `Hi ${firstName}, Please verify your email ${token}`,
    };
    await sendMail(mailOptions);
    return res.status(201).json({
      message: `Hi ${firstName.toUpperCase()}, Your accout has been created successfully. Please check your mail for verification link.`,
      newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//users logging in for the first time
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await validateLogin.validateAsync(req.body);
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res.status(401).json({
        success: false,
        message: "Email doens't exist, please create account",
      });
    }
    const isPasswordExist = await bcrypt.compare(password, emailExist.password);
    console.log(isPasswordExist);
    if (!isPasswordExist) {
      return res.status(401).json({
        success: false,
        message: "password does not exist",
      });
    }
    const data = {
      id: emailExist.id,
      email: emailExist.email,
      role: emailExist.role,
    };
    const token = await jwt.sign(data, rent_Token, { expiresIn: "2h" });

    return res.status(200).json({
      success: true,
      message: "login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//fetch users profile on the platform
exports.fetchAllUsers = async (req, res, next) => {
  try {
    const showAlluser = await User.find();

    return res.status(200).json({
      success: true,
      showAlluser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    const secret_key = process.env.rent_Token;
    const decodedToken = await jwt.verify(token, secret_key);
    const user = await User.findOne({ email: decodedToken.email }).select(
      "isVerified"
    );
    if (user.isVerified) {
      return res.status(400).json({
        message: "user verified already",
      });
    }
    user.isVerified = true;
    user.save();
    return res.status(201).json({
      message: `Hi ${decodedToken.firstName}, Your account has been verified, You can now proceed to login`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};

exports.resendVerificationMail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
      return res.status(400).json({
        message: "  This email does not exist, pls sign up.",
      });
    }
    const data = {
      email: emailExists.email,
      firstName: emailExists.firstName,
    };
    console.log(data);
    // getting a secret token when login is successful.
    const secret_key = process.env.rent_Token;
    const token = await jwt.sign(data, secret_key, { expiresIn: "2h" });
    let mailOptions = {
      to: emailExists.email,
      subject: "Verify Email",
      text: `Hi ${emailExists.firstName}, Pls verify your account with the link below.`,
    };
    await sendMail(mailOptions);
    return res.status(200).json({
      message: `Hi ${emailExists.firstName}, Pls check your mail for verification link.`,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Please try again later.`,
    });
  }
};

exports.forgetPasswordLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userEmail = await User.findOne({ email });
    if (!userEmail) {
      res.status(404).json({
        message: `Email not found.`,
      });
    }
    const data = {
      id: userEmail._id,
      email: userEmail.email,
      role: userEmail.role,
    };
    // getting a secret token
    const secret_key = process.env.rent_Token;
    const token = await jwt.sign(data, secret_key, { expiresIn: "2h" });
    let mailOptions = {
      to: userEmail.email,
      subject: "Reset Password",
      text: `Hi ${userEmail.firstName}, Reset your password with the link below. Your reset token is ${token}`,
    };
    await sendMail(mailOptions);
    return res.status(200).json({
      message: `Hi ${userEmail.firstName}, Pls check your email for the reset password link.`,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${error.message}, Try again later.`,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email, token } = req.headers;
    const secret_key = process.env.rent_Token;
    const decoded_token = await jwt.verify(token, secret_key);
    if (decoded_token.email !== email) {
      return res.status(400).json({
        message: `Email do not match.`,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: `Password do not match.`,
      });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    const updatedPassword = await User.updateOne(
      { email },
      { password: hashPassword },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Try agin later.`,
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { email } = req.query;
    const loggedUser = await User.findOne({ email });
    const headerTokenEmail = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.rent_Token
    ).email;
    if (headerTokenEmail !== loggedUser.email) {
    }
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      loggedUser.password
    );
    // console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(400).json({
        message: `password is  not same as old password`,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(409).json({
        message: "Password do not match.",
      });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    const resetPassword = await User.updateOne(
      { email },
      { password: hashPassword }
    );
    return res.status(200).json({
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: `${error.message}, Please Try again later.`,
    });
  }
};
// Logout User
exports.logout = (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  return res.status(200).json({
    message: `User logged out successfully.`,
  });
};
