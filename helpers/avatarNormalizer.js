const Jimp = require("jimp");

const avatarNormalizer = async (imagePath) => {
  const avatar = await Jimp.read(imagePath);
  avatar.resize(250, 250);
};
module.exports = avatarNormalizer;
