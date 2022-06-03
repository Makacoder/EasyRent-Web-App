const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../utils/keys");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {


});
passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURI: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
        done(null);
      }
  )
);