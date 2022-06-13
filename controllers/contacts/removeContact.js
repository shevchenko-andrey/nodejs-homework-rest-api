const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const removeContact = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const oldContact = await Contact.findByIdAndRemove(contactId)
    .where({
      owner: _id,
    })
    .populate("owner", "_id name email subscription");
  if (!oldContact) {
    throw new NotFound(`Contacts with id ${contactId} not found`);
  }

  res.json({
    status: "Success",
    message: "Contact successfully deleted",
    code: 200,
    data: oldContact,
  });
};
module.exports = removeContact;
