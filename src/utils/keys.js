/** @format */

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    session: {
    cookie_key: process.env.cookie_key,
  },
};
