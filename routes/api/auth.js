const express = require("express");

const {
  auth: { register },
} = require("../../controllers");

const { joiRegisterSchema } = require("../../models/user");
const { validation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.post("/register", validation(joiRegisterSchema), ctrlWrapper(register));

module.exports = router;
