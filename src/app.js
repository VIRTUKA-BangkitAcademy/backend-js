const express = require('express');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');
const routeIndex = require('./route/index');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/images/frame', express.static(path.join(__dirname, '..', 'images/frame')));

app.use(routeIndex);

module.exports = app;
