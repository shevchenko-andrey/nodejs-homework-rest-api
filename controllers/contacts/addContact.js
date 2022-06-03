const { Contact } = require("../../models");
const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Contact successfully added",
    code: 201,
    data: {
      result: newContact,
    },
  });
};
module.exports = addContact;
