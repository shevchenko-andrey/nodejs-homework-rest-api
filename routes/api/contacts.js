const express = require("express");
const router = express.Router();
const {
  contacts: {
    getAll,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    changeContactStatus,
  },
} = require("../../controllers");
const { ctrlWrapper, validation, validateId } = require("../../middlewares");
const { joiSchema, joiSchemaStatus } = require("../../models/contact");

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", validateId, ctrlWrapper(getContactById));

router.post("/", validateId, validation(joiSchema), ctrlWrapper(addContact));

router.delete("/:contactId", validateId, ctrlWrapper(removeContact));

router.put(
  "/:contactId",
  validateId,
  validation(joiSchema),
  ctrlWrapper(updateContact)
);
router.patch(
  "/:contactId",
  validateId,
  validation(joiSchemaStatus),
  ctrlWrapper(changeContactStatus)
);
module.exports = router;
