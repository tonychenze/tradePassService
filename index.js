const express = require("express");
const app = express();
const limits = require("./routes/limits");

const port = process.env.PORT || 3500;
app.use(express.json());

//routing for the limits
app.use("/limits", limits);

app.listen(port, () => {
  console.log(`Starting on the port ${port}`);
});
