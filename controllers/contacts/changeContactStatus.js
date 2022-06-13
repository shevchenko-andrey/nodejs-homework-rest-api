const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const changeContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;
  const updetedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  )
    .where({
      owner: _id,
    })
    .populate("owner", "_id name email subscription");

  if (!updetedContact) {
    throw new NotFound(`Contact with id=${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: updetedContact,
    },
  });
};

module.exports = changeContactStatus;
