const mongoose = require("mongoose");
const Joi = require("joi");

const FxLimit = mongoose.model(
  "FxLimit",
  new mongoose.Schema({
    description: {
      type: String,
      minlength: 5,
      maxlength: 50,
      unique: true,
      required: true
    },
    type: {
      type: String,
      required: true,
      default: "FX"
    },
    utilisation: {
      type: Number,
      default: 0
    },
    exposure: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      required: true
    },
    mrm: {
      type: String,
      default: "FX-MRM"
    },
    business: {
      type: String,
      default: "FX-BUSINESS"
    },
    tick: {
      type: Number,
      required: true,
      default: 0.5
    },
    breach: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      maxlength: 5
    }
  })
);

function validateFX(fx) {
  const fxSchema = {
    description: Joi.string()
      .min(5)
      .max(50),
    type: Joi.string()
      .min(1)
      .max(50),
    utilisation: Joi.number(),
    exposure: Joi.number(),
    limit: Joi.number().required(),
    mrm: Joi.string()
      .min(5)
      .max(50),
    business: Joi.string()
      .min(5)
      .max(50),
    tick: Joi.number(),
    breach: Joi.number(),
    currency: Joi.string().required()
  };

  return Joi.validate(fx, fxSchema);
}

exports.FxLimit = FxLimit;
exports.validate = validateFX;
