require('dotenv').config();
require('./db_connection');
const express = require('express');
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.use(
  '/api/v1/inventory/tanks',
  require('./api/v1/inventory/tanks/routes')
);

// Set the default response for non-existent paths
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(process.env.APP_PORT, () => {
  console.log('http://localhost:' + process.env.APP_PORT);
});