const express = require("express");
//routing for the limits
const fxLimit = require("../routes/fx-limit-route");
const bondItems = require("../routes/bond-item-route");
module.exports = function(app) {
  app.use(express.json());
  app.use("/api/fxlimits", fxLimit);
  app.use("/api/bonditems", bondItems);
};
