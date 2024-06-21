const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const productsFilePath = path.join(__dirname, "../datos/products.json");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const readProductsFromFile = () => {
  const data = fs.readFileSync(productsFilePath, "utf-8");
  return JSON.parse(data);
};

const writeProductsToFile = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

router.get("/", (req, res) => {
  const products = readProductsFromFile();
  res.json(products);
});

router.get("/:pid", (req, res) => {
  const products = readProductsFromFile();
  const product = products.find((p) => p.id === parseInt(req.params.pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

router.post("/", upload.single("thumbnail"), (req, res) => {
  const products = readProductsFromFile();
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status !== undefined ? req.body.status : true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.file ? [req.file.path] : [],
  };
  products.push(newProduct);
  writeProductsToFile(products);
  res.status(201).json(newProduct);
});

router.put("/:pid", upload.single("thumbnail"), (req, res) => {
  const products = readProductsFromFile();
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.pid)
  );
  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...req.body };
    updatedProduct.id = products[productIndex].id; // No actualizar el ID
    if (req.file) {
      updatedProduct.thumbnails = [req.file.path];
    }
    products[productIndex] = updatedProduct;
    writeProductsToFile(products);
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

router.delete("/:pid", (req, res) => {
  let products = readProductsFromFile();
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.pid)
  );
  if (productIndex !== -1) {
    products = products.filter((p) => p.id !== parseInt(req.params.pid));
    writeProductsToFile(products);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

module.exports = router;
