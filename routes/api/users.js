const express = require("express");
const {
  users: { getCurrent, changeSubscription },
} = require("../../controllers");
const { joiSubSchema } = require("../../models/user");
const { auth, validation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();
router.patch(
  "/",
  auth,
  validation(joiSubSchema),
  ctrlWrapper(changeSubscription)
);
router.get("/current", auth, ctrlWrapper(getCurrent));

module.exports = router;
