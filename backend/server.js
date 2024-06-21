const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const productsRouter = require("./api/products");
const cartsRouter = require("./api/carts");
const PORT = process.env.PORT || 8080;

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
