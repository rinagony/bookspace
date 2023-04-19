const express = require("express");
let products = require('./data/products.json');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.use(cors());

app.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:3001/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
