const express = require('express');
const cors = require('cors');
const routeIndex = require('./route/index');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use(routeIndex);

module.exports = app;
