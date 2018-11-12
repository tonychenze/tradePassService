const express = require("express");
const Joi = require("joi");
const router = express.Router();

const limits = [
  {
    _id: "1",
    description: "USD-GBP",
    utilisation: 110,
    exposure: 11,
    limit: 10,
    mrm: "MRM Onwer 1",
    business: "business owner",
    supervisor: "supervisor ",
    tick: 0.5,
    breach: 1.2,
    currency: "$"
  },
  {
    _id: "2",
    description: "GBP-EUR",
    utilisation: 35,
    exposure: 7,
    limit: 20,
    mrm: "MRM Onwer 2",
    business: "business owner 3",
    supervisor: "supervisor 4 ",
    tick: 1,
    breach: 1.5,
    currency: "€"
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

router.post("/", (req, res) => {
  const result = validateLimit(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const request = req.body;
  const newLimit = {
    _id: limits.length + 1,
    description: request.description,
    utilisation: request.utilisation,
    exposure: request.exposure,
    limit: request.limit,
    mrm: request.mrm,
    business: request.business,
    supervisor: request.supervisor,
    tick: request.tick,
    breach: request.breach,
    currency: request.currency,
    unit: request.unit
  };
  limits.push(newLimit);
  res.send(newLimit);
});

router.put("/:limitId", (req, res) => {
  const target = findLimit(req.params.limitId);
  if (!target) res.status(404).send("no such course, check ID again");

  const validate = validateLimit(req.body);
  if (validate.error) res.status(400).send(validate.error.details[0].message);
  target.limit = req.body.limit;
  res.send(target);
});

router.delete("/:limitId", (req, res) => {
  const target = findLimit(req.params.limitId);
  if (!target) res.status(404).send("cant find the course");
  const index = limits.indexOf(target);
  limits.splice(index, 1);
  res.send(target);
});

function findLimit(limitId) {
  return limits.find(c => c._id === limitId);
}

function validateLimit(limit) {
  const schema = {
    description: Joi.string().required()
  };
  return Joi.validate(limit, schema);
}
module.exports = router;
