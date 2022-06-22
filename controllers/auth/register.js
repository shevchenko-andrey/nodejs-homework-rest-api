const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { sgMail } = require("../../helpers");
const { v4 } = require("uuid");
const baseURL = "http://localhost:8080/api";
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Contact with ${email} already exist`);
  }
  const avatarURL = gravatar.url(email, null, "https");
  const verificationToken = v4();
  const newUser = new User({ name, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  newUser.save();
  const msg = {
    to: email,
    from: "andrebro.shevchenko@gmail.com",
    subject: "Confirm your email",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a target="_blank" href='${baseURL}/users/verify/${verificationToken}'>Confirm email</a>`,
  };

  await sgMail.send(msg);

  res.status(201).json({
    status: "Succses",
    code: 201,
    data: {
      user: {
        email,
        name,
        avatarURL,
        verificationToken,
      },
    },
  });
};
module.exports = register;
