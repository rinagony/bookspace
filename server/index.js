const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
let products = require("./data/products.json");
const productsSelectedFile = path.resolve(
  __dirname,
  "./data/productsSelected.json"
);
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/productsSelected", (req, res) => {
  fs.readFile(productsSelectedFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read file" });
    }

    const allProductsSelected = JSON.parse(data);
    res.json(allProductsSelected);
  });
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
    const ifProductAlreadyExist = allProducts.find(
      (item) => item.id === productsSelected.id
    );
    if (ifProductAlreadyExist) {
      for (const item of allProducts) {
         if (item.id === productsSelected.id) {
          item.amount += 1;
         }
        }
    } else {
      productsSelected['amount'] = 1;
      allProducts.push(productsSelected);
    }

    fs.writeFile(productsSelectedFile, JSON.stringify(allProducts), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to write file" });
      }
      res.json(allProducts);
    });
  });
});

app.delete('/api/productsSelected', (req, res) => {
  const productsSelected = req.body;
  fs.readFile(productsSelectedFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read file" });
    }

    const allProducts = JSON.parse(data).filter(
      (item) => item.id !== productsSelected.id
    );

    fs.writeFile(productsSelectedFile, JSON.stringify(allProducts), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to remove object" });
      }
      res.status(202).json({message: 'Success!'});
    });
  });
})

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3001/", //original url
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
