const nodemailer = require('nodemailer');
const bodyMail = require('./bodyMail');

const verifiedEmail = (emailTo, nameTo, token) => {
  let transporter = nodemailer.createTransport({
    // service: 'Gmail',
    // auth: {
    //   user: process.env.EMAIL_SERVICE, // generated ethereal user
    //   pass: process.env.PASS_EMAIL_SERVICE, // generated ethereal password
    // },
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_SECURE,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS,
    },
  });

  transporter
    .sendMail({
      // eslint-disable-next-line no-undef
      from: `CEO Vehicle Rental | ${process.env.NODEMAILER_AUTH_USER}`, // sender address
      to: emailTo, // list of receivers
      subject: 'Vehicle Rental | Email Verification', // Subject line
      html: bodyMail(token, nameTo), // html body
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = verifiedEmail;
