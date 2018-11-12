const express = require("express");
const mongoose = require("mongoose");
const fxLimit = require("./routes/fx-limit-route");

const app = express();
app.use(express.json());
//connect to Mongodb
mongoose
  .connect(
    "mongodb://localhost/tradepass",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongodb..."))
  .catch(e => console.log(e));

const port = process.env.PORT || 3500;

//routing for the limits
app.use("/fxlimits", fxLimit);

app.listen(port, () => {
  console.log(`Starting on the port ${port}`);
});
