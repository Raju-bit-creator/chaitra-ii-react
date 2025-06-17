const express = require("express"); //common js model
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const port = process.env.PORT;

app.get("/about/id", (req, res) => {
  res.send("Hello chaitra group");
});

app.get("/contact", (req, res) => {
  res.send("thsi is contact page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
