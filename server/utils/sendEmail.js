const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,  // tumhara gmail/scet mail
//     pass: process.env.EMAIL_PASS   // app password
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // ya tumhare SMTP server ka host
  port: 465, // or 587
  secure: true, // true for 465, false for other ports
  auth: {
   user: process.env.EMAIL_USER,   // common sender email
    pass: process.env.EMAIL_PASS,   // app password

  },
   tls: {
    rejectUnauthorized: false, // ignore self-signed certificates
  },
});


const sendEmail = async (options) => {
  await transporter.sendMail({
    from: `"SCET Nexus" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};



module.exports = sendEmail;
