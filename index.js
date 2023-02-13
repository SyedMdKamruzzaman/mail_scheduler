const express = require("express");
const app = express();
const cron = require("node-cron");
const mailer = require("nodemailer");

cron.schedule("*/5 * * * * *", function () {
  sendEmail("test");
});

function sendEmail(message) {
  const transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "user_email",
      pass: "less_secure_app_pass",
    },
  });

  transporter
    .sendMail({
      from: 'sender_email',
      to: 'receiver_email',
      text: message,
    })
    .then((_) => {
      console.log("Email sent on " + new Date());
    })
    .catch((error) => {
      console.log(error);
    });
}

app.listen(2400, () => {
  console.log("Server started at port 2400");
});
