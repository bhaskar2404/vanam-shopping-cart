const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const { applyMiddleware } = require("redux");

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: {
      type: String,
      default: shortid.generate,
    },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: { type: String, default: shortid.generate },
      email: String,
      name: String,
      address: String,
      totle: Number,
      cartItems: [{ _id: String, tile: String, price: Number, count: Number }],
    },
    {
      timestamps: true,
    }
  )
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));

app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.title ||
    !req.body.address ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required" });
  }
  const order = await Order(req, res).save();
  res.send(order);
});

app.get("/api/orders", async (req, res) => {
  const orderes = await Order.find({});
  res.send(orderes);
});

app.delete("/api/orders/:id", async (req, res) => {
  const order = Order.findByIdAndDelete(req.params.id);
  res.send(order);
});
