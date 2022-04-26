const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/user.route");

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

connectDB();

app.get("/", (req, res) => {
  res.send({
    message: "You're a Badass Developer",
  });
});

app.use("/api/v1", router);

module.exports = app;
