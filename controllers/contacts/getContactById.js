const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contactItem = await Contact.findById(contactId);
  if (!contactItem) {
    throw new NotFound(`Contacts with id ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: contactItem,
  });
};
module.exports = getContactById;
