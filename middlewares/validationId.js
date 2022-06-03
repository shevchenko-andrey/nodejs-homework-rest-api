const mongoose = require("mongoose");
const createError = require("http-errors");

const validateId = (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isError = !mongoose.isObjectIdOrHexString(contactId);
    console.log(isError);
    if (isError) {
      throw createError(400, "Incorrect format id");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateId;
