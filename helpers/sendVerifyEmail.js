const sgMail = require("./sgMail");
const { SENDGRID_SENDER } = process.env;
const sendVerifyEmail = async (email, URL, message) => {
  const msg = {
    to: email,
    from: SENDGRID_SENDER,
    subject: "Confirm your email",
    text: "You're on your way! Let's confirm your email address. By clicking on the following link, you are confirming your email address.",
    html: `<a target="_blank" href=${URL}>${message}</a>`,
  };

  await sgMail.send(msg);
};
module.exports = sendVerifyEmail;
