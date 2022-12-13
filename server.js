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

const OrdersSchema = new mongoose.Schema(
  {
    number: { type: Number, default: 0},
    orderType: String,
    paymentType: String,
    isPaid: { type: Boolean, default: false },
    isReady: { type: Boolean, default: false },
    inProgress: { type: Boolean, default: true },
    isCanceled: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    itemsPrice: Number,
    taxPrice: Number,
    totalPrice: Number,
    orderItems: [
      {
        name: String,
        price: Number,
        quantity: Number
      }
    ]
  },
  {
    timestamps: true
  }
);

const Products = mongoose.model("Products", ProductsSchema);
const Orders = mongoose.model("Orders", OrdersSchema);

/*
  app.get("/products-list", async (req, res) => {
    const products = await Products.insertMany(data.products);

    res.send({ products });
  });
*/

app.get("/products", async (req, res) => {
  const { category } = req.query;

  const products = await Products.find(category ? { category } : {});

  res.send(products);
});

app.post("/products", async(req, res) => {
  const newProduct = new Products(req.body);
  
  const savedProduct = await newProduct.save();

  res.send(savedProduct);
});

app.get("/categories", (req, res) => {
  res.send(data.categories);
});

app.post("/orders", async(req, res) => {
  const lastOrder = await Orders.find().sort({ number: -1 }).limit(1);

  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;

  if(
    !req.body.orderType ||
    !req.body.paymentType ||
    !req.body.orderItems ||
    !req.body.orderItems.length === 0
  ) {
    return res.send({ message: "All fields are mandatory!" });
  }

  const order = await Orders({ ...req.body, number: lastNumber + 1 }).save();

  res.send(order);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}!`);
});

