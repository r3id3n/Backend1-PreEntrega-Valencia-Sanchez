const express = require("express");
const app = express();
const path = require("path");
const productsRouter = require("./api/products");
const cartsRouter = require("./api/carts");
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
