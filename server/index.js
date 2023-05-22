const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
let about = require("./data/about.json");
let bar = require("./data/bar.json");
let contacts = require("./data/contacts.json");
let products = require("./data/products.json");
const productsSelectedFile = path.resolve(
  __dirname,
  "./data/productsSelected.json"
);
const reservationListFile = path.resolve(
  __dirname,
  "./data/reservationList.json"
);
const barReservationListFile = path.resolve(
  __dirname,
  "./data/barReservationList.json"
);
const productsPath = path.resolve(__dirname, "./data/products.json");

const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.get("/api/products", (req, res) => {
  fs.readFile(productsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read file" });
    }

    const allProducts = JSON.parse(data);
    res.json(allProducts);
  });
});

app.get("/api/about", (req, res) => {
  res.json(about);
});

app.get("/api/bar", (req, res) => {
  res.json(bar);
});

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
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
      productsSelected["amount"] = 1;
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

app.post("/api/addPackReservation", (req, res) => {
  const newBarReservation = req.body;
  fs.readFile(barReservationListFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read file" });
    }

    const allBarReservations = JSON.parse(data);
    allBarReservations.push(newBarReservation);

    fs.writeFile(
      barReservationListFile,
      JSON.stringify(allBarReservations),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to write file" });
        }
        res.status(201).json({ status: 201 });
      }
    );
  });
});

app.post("/api/addBarReservation", (req, res) => {
  const newBarReservation = req.body;
  fs.readFile(reservationListFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read file" });
    }

    const allReservations = JSON.parse(data);
    allReservations.push(newBarReservation);

    fs.writeFile(
      reservationListFile,
      JSON.stringify(allReservations),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to write file" });
        }
        res.status(201).json({ status: 201 });
      }
    );
  });
});

app.delete("/api/productsSelected", (req, res) => {
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
      res.status(202).json({ message: "Success!" });
    });
  });
});

app.post("/api/updateRating", (req, res) => {
  const productToUpdate = req.body;
  fs.readFile(productsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read file" });
    }
    const parsedData = JSON.parse(data)
    function medianValue(arr) {
      if (arr.length == 0) {
        return;
      }
      arr.sort((a, b) => a - b);
      const midpoint = Math.floor(arr.length / 2);
      const median =
        arr.length % 2 === 1
          ? arr[midpoint]
          : (arr[midpoint - 1] + arr[midpoint]) / 2;
      return median;
    }
    objIndex = parsedData.findIndex((obj => obj.id == productToUpdate.id));
    parsedData[objIndex].rating.votes.push(productToUpdate.vote);
    parsedData[objIndex].rating.value = medianValue(parsedData[objIndex].rating.votes);
    parsedData[objIndex].rating.review.push(productToUpdate.review)
    fs.writeFile(productsPath, JSON.stringify(parsedData), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update object" });
      }
      res.status(202).json({ message: "Success!" });
    });
  });
});

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
