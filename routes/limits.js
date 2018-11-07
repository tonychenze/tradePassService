const express = require("express");
const Joi = require("joi");
const router = express.Router();

const limits = [
  {
    _id: "1",
    description: "USD-GBP",
    type: "FX",
    utilisation: 110,
    exposure: 11,
    limit: 10,
    mrm: "MRM Onwer 1",
    business: "business owner",
    supervisor: "supervisor ",
    tick: 0.5,
    breach: 1.2,
    currency: "$",
    unit: "M"
  },
  {
    _id: "2",
    description: "GBP-EUR",
    type: "FX",
    utilisation: 35,
    exposure: 7,
    limit: 20,
    mrm: "MRM Onwer 2",
    business: "business owner 3",
    supervisor: "supervisor 4 ",
    tick: 1,
    breach: 1.5,
    currency: "€",
    unit: "M"
  }
];

router.get("/", (req, res) => {
  res.send(limits);
});

router.get("/:limitId", (req, res) => {
  const course = findLimit(req.params.limitId);
  if (!course)
    return res.status(404).send("no such limit, check limit id again");
  res.send(course);
});

function findLimit(limitId) {
  return limits.find(c => c._id === limitId);
}
module.exports = router;
