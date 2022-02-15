const express = require("express");
const app = express();
app.post("/", (req, res) => {
  res.send("Hello World");
});
app.listen(5000, () => {
  console.log("application ready");
});
