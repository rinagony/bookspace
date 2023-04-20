const express = require("express");
const fs = require("fs");
const path = require("path")
const bodyParser = require('body-parser');
let products = require("./data/products.json");
const productsSelectedFile = path.resolve(__dirname, "./data/productsSelected.json");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/productsSelected", (req, res) => {
  const productsSelected = req.body;
  fs.readFile(productsSelectedFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read file" });
    }

    const allProducts = JSON.parse(data);
    allProducts.push(productsSelected);

    fs.writeFile(
      productsSelectedFile,
      JSON.stringify(allProducts),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to write file" });
        }
        res.json(allProducts);
      }
    );
  });
});

app.use(cors());

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3001/", //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
