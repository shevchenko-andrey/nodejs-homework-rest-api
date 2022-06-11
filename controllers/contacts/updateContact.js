const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const updetedContact = await Contact.findByIdAndUpdate(
    contactId,
    { ...req.body, owner: _id },
    {
      new: true,
    }
  );
  if (!updetedContact) {
    throw new NotFound(`Contact with id=${contactId} not found!`);
  }
  res.json({
    status: "success",
    message: "Contact successfully update",
    code: 200,
    data: {
      result: updetedContact,
    },
  });
};
module.exports = updateContact;
