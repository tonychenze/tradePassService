const express = require("express");
const mongoose = require("mongoose");
const limits = require("./routes/limits");

const app = express();
app.use(express.json());
//connect to Mongodb
mongoose
  .connect("mongodb://localhost/tradepass")
  .then(() => console.log("Connected to mongodb..."))
  .catch(e => console.log(e));

const port = process.env.PORT || 3500;

//routing for the limits
app.use("/limits", limits);

app.listen(port, () => {
  console.log(`Starting on the port ${port}`);
});
