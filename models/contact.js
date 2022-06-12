const { Schema, model } = require("mongoose");
const Joi = require("joi");
const regExpForPhone = /^[0-9]+$/;
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: regExpForPhone,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).pattern(regExpForPhone).required(),
  favorite: Joi.boolean(),
});

const joiSchemaStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contacts", contactSchema);
module.exports = {
  Contact,
  joiSchema,
  joiSchemaStatus,
};
