const { User } = require("../../models");
const { Conflict } = require("http-errors");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Contact with ${email} already exist`);
  }

  const result = await User.create({ name, email, password });
  res.status(201).json({
    status: "Succses",
    code: 201,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};
module.exports = register;
