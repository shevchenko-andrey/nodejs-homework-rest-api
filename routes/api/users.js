const express = require("express");
const {
  users: { getCurrent, updateAvatar, changeSubscription },
} = require("../../controllers");
const { joiSubSchema } = require("../../models/user");
const { auth, validation, upload, ctrlWrapper } = require("../../middlewares");

const router = express.Router();
router.patch(
  "/",
  auth,
  validation(joiSubSchema),
  ctrlWrapper(changeSubscription)
);
router.get("/current", auth, ctrlWrapper(getCurrent));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
