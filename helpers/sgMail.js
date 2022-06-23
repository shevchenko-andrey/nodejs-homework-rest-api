const sgMail = require("@sendgrid/mail");
// require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

module.exports = sgMail.setApiKey(SENDGRID_API_KEY);
