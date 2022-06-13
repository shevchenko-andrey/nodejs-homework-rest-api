const { Contact } = require("../../models");
const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email subscription");
  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};
module.exports = getAll;
