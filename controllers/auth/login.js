const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email not found");
  }

  if (!user.comparePassword(password)) {
    throw new Unauthorized("Password wrong");
  }
  const { SECRET_KEY } = process.env;

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};
module.exports = login;