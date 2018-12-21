const express = require("express");
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);
const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`Starting on the port ${port}`);
});
