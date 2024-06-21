const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const cartsFilePath = path.join(__dirname, "../datos/carrito.json");
const productsFilePath = path.join(__dirname, "../datos/products.json");

const readCartsFromFile = () => {
  const data = fs.readFileSync(cartsFilePath, "utf-8");
  return JSON.parse(data);
};

const readProductsFromFile = () => {
  const data = fs.readFileSync(productsFilePath, "utf-8");
  return JSON.parse(data);
};

const writeCartsToFile = (carts) => {
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

router.post("/", (req, res) => {
  const carts = readCartsFromFile();
  const newCart = {
    id: carts.length ? carts[carts.length - 1].id + 1 : 1,
    products: [],
  };
  carts.push(newCart);
  writeCartsToFile(carts);
  res.status(201).json(newCart);
});

router.get("/", (req, res) => {
  const carts = readCartsFromFile();
  res.json(carts);
});

router.get("/:cid", (req, res) => {
  const carts = readCartsFromFile();
  const cart = carts.find((c) => c.id === parseInt(req.params.cid));
  if (cart) {
    const products = readProductsFromFile();
    const cartWithPrices = cart.products.map((item) => ({
      ...item,
      price: products.find((p) => p.id === item.product).price,
    }));
    res.json(cartWithPrices);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const carts = readCartsFromFile();
  const cart = carts.find((c) => c.id === parseInt(req.params.cid));
  if (cart) {
    const productId = parseInt(req.params.pid);
    const product = cart.products.find((p) => p.product === productId);
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    writeCartsToFile(carts);
    res.status(201).json(cart);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

router.put("/:cid/product/:pid", (req, res) => {
  const carts = readCartsFromFile();
  const cart = carts.find((c) => c.id === parseInt(req.params.cid));
  if (cart) {
    const productId = parseInt(req.params.pid);
    const product = cart.products.find((p) => p.product === productId);
    if (product) {
      product.quantity = req.body.quantity;
      writeCartsToFile(carts);
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

router.delete("/:cid/product/:pid", (req, res) => {
  const carts = readCartsFromFile();
  const cart = carts.find((c) => c.id === parseInt(req.params.cid));
  if (cart) {
    const productId = parseInt(req.params.pid);
    cart.products = cart.products.filter((p) => p.product !== productId);
    writeCartsToFile(carts);
    res.status(200).json(cart);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

module.exports = router;
