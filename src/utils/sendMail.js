const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const sendMail = async (config) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.cykle.studio",
      port: 465,
      secure: true,
      auth: {
        user: "easyrent@cykle.studio",
        //process.env.user,
        pass: "Re?tP6dP(4vq",
        //process.env.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: "EasyRent",
      ...config,
    });

    return `Preview URL: %s', ${nodemailer.getTestMessageUrl(info)}`;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendMail };
