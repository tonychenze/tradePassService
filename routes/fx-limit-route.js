const express = require("express");
const router = express.Router();
const { FxLimit, validate } = require("../models/fx-limit");

router.get("/", async (req, res) => {
  try {
    const fxLimits = await FxLimit.find().sort("description");
    return res.status(200).send(fxLimits);
  } catch (e) {
    for (filed in e.errors) {
      return res.status(500).send(ex.errors[filed]);
    }
  }
});

router.get("/:limitId", async (req, res) => {
  const course = await FxLimit.findOne(req.params.limitId);
  if (!course)
    return res.status(404).send("no such limit, check limit id again");
  return res.status(200).send(course);
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let newLimit = new FxLimit(req.body);
  try {
    newLimit = await newLimit.save();
    return res.status(200).send(newLimit);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/:limitId", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let targetFx = await FxLimit.findOneAndUpdate(req.body.limitId, req.body, {
    new: true
  });
  if (!targetFx) res.status(404).send("no such course, check ID again");
  return res.status(200).send(targetFx);
});

router.delete("/:limitId", async (req, res) => {
  try {
    const targetFx = await FxLimit.findOneAndDelete(req.params.limitId);
  } catch (e) {
    return res.status(400).send(e.message);
  }

  if (!targetFx) res.status(404).send("cant find the course");
  return res.status(200).send(targetFx);
});

module.exports = router;
