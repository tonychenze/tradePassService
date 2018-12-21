const express = require("express");
const router = express.Router();
const { FxLimit, validate } = require("../models/fx-limit");

router.get("/", async (req, res) => {
  try {
    const fxLimits = await FxLimit.find().sort("description");
    return res.status(200).send(fxLimits);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:limitId", async (req, res) => {
  try {
    const course = await FxLimit.findById(req.params.limitId);
    if (!course)
      return res.status(404).send("no such limit, check limit id again");
    return res.status(200).send(course);
  } catch (e) {
    return res.status(500).send("no such limit, check limit id again");
  }
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  
  const newLimit = new FxLimit(req.body);
  await newLimit.save();
  return res.status(200).send(newLimit);
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
    if (!targetFx) res.status(404).send("cant find the course");
    return res.status(200).send(targetFx);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = router;
