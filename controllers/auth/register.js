const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { sendVerifyEmail } = require("../../helpers");
const { v4 } = require("uuid");
const { baseURL } = require("../../helpers/constants");
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

  await sendVerifyEmail(
    email,
    `${baseURL}/users/verify/${verificationToken}`,
    "Confirm email"
  );

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
