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
const {
  ctrlWrapper,
  auth,
  validation,
  validateId,
} = require("../../middlewares");
const { joiSchema, joiSchemaStatus } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(getAll));

router.get("/:contactId", auth, validateId, ctrlWrapper(getContactById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(addContact));

router.delete("/:contactId", auth, validateId, ctrlWrapper(removeContact));

router.put(
  "/:contactId",
  auth,
  validateId,
  validation(joiSchema),
  ctrlWrapper(updateContact)
);
router.patch(
  "/:contactId",
  auth,
  validateId,
  validation(joiSchemaStatus),
  ctrlWrapper(changeContactStatus)
);
module.exports = router;
