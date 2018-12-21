const express = require("express");
const router = express.Router();
const { BondItem } = require("../models/bondItem");

router.get("/", async (req, res) => {
  try {
    const bondItems = await BondItem.find().sort("instrument");
    return res.status(200).send(bondItems);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:bondId", async (req, res) => {
  try {
    const item = await BondItem.findById(req.params.bondId);
    if (!item) return res.status(404).send("no such bond, check id again");
    return res.status(200).send(item);
  } catch (e) {
    return res.status(500).send("no such bond, check bond id again");
  }
});

router.post("/", async (req, res) => {
  //   const result = validate(req.body);
  //   if (result.error)
  //     return res.status(400).send(result.error.details[0].message);

  const newItem = new BondItem(req.body);
  await newItem.save();
  return res.status(200).send(newItem);
});

router.put("/:bondId", async (req, res) => {
  let targetBond = await BondItem.findOneAndUpdate(req.body.bondId, req.body, {
    new: true
  });
  if (!targetBond) res.status(404).send("no such bond, check ID again");
  return res.status(200).send(targetBond);
});

router.delete("/:bondId", async (req, res) => {
  try {
    const targetBond = await BondItem.findOneAndDelete(req.params.bondId);
    if (!targetBond) res.status(404).send("cant find the bond");
    return res.status(200).send(targetBond);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = router;
