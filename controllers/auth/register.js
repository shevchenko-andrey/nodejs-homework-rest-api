const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Contact with ${email} already exist`);
  }
  const avatarURL = gravatar.url(email, null, "https");
  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "Succses",
    code: 201,
    data: {
      user: {
        email,
        name,
        avatarURL,
      },
    },
  });
};
module.exports = register;
