const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const data = require("./data");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
*/

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected!"))
  .catch((error) => console.log(error.message));

const ProductsSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  calorie: Number,
  category: String
});

const Products = mongoose.model("Products", ProductsSchema);

app.get("/products", async (req, res) => {
  const products = await Products.insertMany(data.products);

  res.send({ products });
});

app.get("/products/:category", async (req, res) => {
  const { category } = req.params;

  const products = await Products.find(category ? { category } : {});

  res.send(products);
});

app.post("products", async(req, res) => {
  const newProduct = new Products(req.body);
  
  const savedProduct = await newProduct.save();

  res.send(savedProduct);
});

app.get("/categories", (req, res) => {
  res.send(data.categories);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}!`);
});

