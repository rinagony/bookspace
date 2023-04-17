const express = require("express");
let products = require('./data/products.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
