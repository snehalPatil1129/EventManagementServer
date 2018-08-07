const mongoose = require("mongoose");
const Joi = require("joi");

const Sponsors = mongoose.model(
  "Sponsors",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
      required: true
    },
    description: String,
    websiteURL: String,
    imageURL: String,
    category: {
      type: String,
      required: true
    }
  })
);

function validateSponsor(sponsor) {
  const schema = {
    name: Joi.string().required(),
    event: Joi.required(),
    description: Joi.string(),
    websiteURL: Joi.string(),
    imageURL: Joi.string(),
    category: Joi.string().required()
  };
  return Joi.validate(sponsor, schema);
}
exports.Sponsors = Sponsors;
exports.validateSponsor = validateSponsor;
