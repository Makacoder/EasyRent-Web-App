const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./src/routes/user.route");
const adminRouter = require("./src/routes/admin.route");
const houseRouter = require("./src/routes/house.route");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./src/utils/passport");
const authRouter = require("./src/routes/auth.route");
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
    console.log("Connection Failed!");
  }
};

connectDB();

// baseurl for easyrent
app.get("/", (req, res) => {
  res.send(
    `<br><br> <h1></h1>How Are You Today? Welcome to EasyRent!</h2><br><br> 
    <button><a href='/auth'>You Can Login With Google Here!</a></button> `
  );
});
// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookie_key],
  })
);
// cookie session is initiated
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

// app.get("/", (req, res) => {
//   res.send({
//     message: "You're a Badass Developer",
//   });
// });

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//router paths
app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", houseRouter);
app.use(authRouter);

module.exports = app;
