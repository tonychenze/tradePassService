const mongoose = require("mongoose");
const Joi = require("joi");

const BondType = mongoose.model(
  "BondType",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 5,
      maxlength: 50,
      unique: true,
      required: true
    }
  })
);

function validateBond(bondType) {
  const fxSchema = {
    name: Joi.string()
      .min(5)
      .max(50)
  };

  return Joi.validate(bondType, fxSchema);
}

exports.BondType = BondType;
exports.validateBond = validateBond;
