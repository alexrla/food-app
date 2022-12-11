const express = require("express");
const data = require("./data");

const app = express();

app.get("/categories", (req, res) => {
  res.send(data.categories);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}!`);
});

