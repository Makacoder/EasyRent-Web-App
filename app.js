const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/user.route");
const cookieSession = require("cookie-session");
const keys = require('./src/utils/keys')

const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Magnificent! You are connected!");
  } catch (error) {
    console.log(error);
    console.log("Not connected");
  }
};
// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookie_key],
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send({
    message: "You're a Badass Developer",
  });
});

app.use("/api/v1", router);

module.exports = app;
