const getAll = require("./contacts/getAll");
const getContactById = require("./contacts/getContactById");
const addContact = require("./contacts/addContact");
const removeContact = require("./contacts/removeContact");
const updateContact = require("./contacts/updateContact");
const changeContactStatus = require("./contacts/changeContactStatus");
module.exports = {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  changeContactStatus,
};
