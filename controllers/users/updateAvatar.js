const { User } = require("../../models");
const path = require("path");
const { avatarNormalizer } = require("../../helpers");
const fs = require("fs/promises");
const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  try {
    const imageName = `${_id}${originalname.trim().replaceAll(" ", "")}`;
    const resultUpload = path.join(avatarDir, imageName);
    await avatarNormalizer(tempUpload);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = updateAvatar;
