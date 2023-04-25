const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
let products = require("./data/products.json");
let productsSelected = require("./data/productsSelected.json");
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
  res.json(productsSelected);
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
      // allProducts.map(
      //   (item) =>
      //     item.id === productsSelected.id && {
      //       ...item,
      //       amount: item.amount + 1,
      //     }
      // );
      for (const item of allProducts) {
         if (item.id === productsSelected.id) {
          item.amount += 1;
         }
        }
      console.log('inside if',  allProducts)
    } else {
      productsSelected['amount'] = 1;
      allProducts.push(productsSelected);
      console.log('inside else',  allProducts)
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
