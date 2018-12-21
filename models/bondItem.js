const mongoose = require("mongoose");

const BondItem = mongoose.model(
  "BondItem",
  new mongoose.Schema({
    instrument: {
      type: String,
      minlength: 1,
      maxlength: 50,
      required: true
    },
    maturityDate: {
      type: String,
      required: true
    },
    A: {
      type: Number,
      default: 0
    },
    B: {
      type: Number,
      default: 0
    },
    C: {
      type: Number,
      default: 0
    },
    D: {
      type: Number,
      default: 0
    },
    E: {
      type: Number,
      default: 0
    },
    F: {
      type: Number,
      default: 0
    },
    G: {
      type: Number,
      default: 0
    },
    H: {
      type: Number,
      default: 0
    },
    I: {
      type: Number,
      default: 0
    },
    II: {
      type: Number,
      default: 0
    },
    Total: {
      type: Number,
      default: 0
    }
  })
);

exports.BondItem = BondItem;
