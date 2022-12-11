const express = require("express");
const cors = require("cors");
const data = require("./data");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/categories", (req, res) => {
  res.send(data.categories);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}!`);
});

