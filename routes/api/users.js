const express = require("express");
const {
  users: { getCurrent },
} = require("../../controllers");

const { auth, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));

module.exports = router;
