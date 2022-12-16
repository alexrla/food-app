const express = require("express");
// const path = require("path");
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

/*
  const CategoriesSchema = new mongoose.Schema({
    name: String,
    image: String
  });
*/

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

// const Categories = mongoose.model("Categories", CategoriesSchema);
const Products = mongoose.model("Products", ProductsSchema);
const Orders = mongoose.model("Orders", OrdersSchema);


/* 
  app.post("/categories-list", async (req, res) => {
    const categories = await Categories.insertMany(data.categories);

    res.send({ categories });
  });
*/

app.get("/categories", (req, res) => {
  res.send(data.categories);
});

app.post("/products-list", async (req, res) => {
  const products = await Products.insertMany(data.products);

  res.send({ products });
});


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

app.get("/orders", async(req, res) => {
  const orders = await Orders.find({ isDelivered: false, isCanceled: false });

  return res.send(orders);
});

app.put("/orders/:id", async(req, res) => {
  const order = await Orders.findById(req.params.id);

  if(order) {
    if(req.body.action === "feito") {
      order.isReady = true;
      order.inProgress = false;
    } else if(req.body.action === "entregue") {
      order.isDelivered = true;
    } else if(req.body.action === "cancelar") {
      order.isCanceled = true;
    }

    await order.save();

    res.send({ message: "Feito" });
  } else {
    res.status(404).send({ message: "Pedido não encontrado!" });
  }
});

app.post("/create-order", async(req, res) => {
  const lastOrder = await Orders.find().sort({ number: -1 }).limit(1);

  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;

  if(
    !req.body.orderType ||
    !req.body.paymentType ||
    !req.body.orderItems ||
    req.body.orderItems.length === 0
  ) {
    return res.send({ message: "Preencha todos os campos!" });
  }

  const order = await Orders({ ...req.body, number: lastNumber + 1 }).save();

  res.send(order);
});

app.get("/orders/queue", async(req, res) => {
  const inProgressOrders = await Orders.find(
    { inProgress: true, isCanceled: false },
    "number"
  );

  const servingOrders = await Orders.find(
    { isReady: true, isDelivered: false },
    "number"
  );

  return res.send({ inProgressOrders, servingOrders });
});

/*
  app.use(express.static(path.join(__dirname, "/build")));


    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "/build/index.html"));
    });
*/

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}!`);
});
