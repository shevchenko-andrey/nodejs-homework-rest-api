// const { User } = require("../../models");

const users = async (req, res) => {
  const { name, email, subscription } = req.user;
  res.json({
    status: "Succsess",
    code: 200,
    data: {
      user: { name, email, subscription },
    },
  });
};

module.exports = users;
