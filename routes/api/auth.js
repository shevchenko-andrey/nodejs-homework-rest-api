const express = require("express");

const {
  auth: { register, login },
} = require("../../controllers");

const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const { validation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.post("/register", validation(joiRegisterSchema), ctrlWrapper(register));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(login));

module.exports = router;
