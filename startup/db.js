const mongoose = require("mongoose");
module.exports = function() {
  mongoose
    .connect("mongodb://localhost/tradepass")
    .then(() => console.log("Connected to mongodb..."))
    .catch(e => console.log(e));
};
