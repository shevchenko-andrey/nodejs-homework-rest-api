const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const { baseURL } = require("../../helpers/constants");
const { sendVerifyEmail } = require("../../helpers");
const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User is not found");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  await sendVerifyEmail(
    email,
    `${baseURL}/users/verify/${user.verificationToken}`,
    "Confirm email"
  );
  res.status(200).json({
    status: "Succses",
    code: 200,
    data: { message: "Verification email sent" },
  });
};
module.exports = resendVerify;
