const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./src/routes/user.route");
const adminRouter = require("./src/routes/admin.route");
const houseRouter = require("./src/routes/house.route");
const cookieSession = require("cookie-session");
const keys = require("./src/utils/keys");
const cors = require("cors");

const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

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

app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", houseRouter);

module.exports = app;
