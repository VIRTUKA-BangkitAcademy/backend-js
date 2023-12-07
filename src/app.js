const express = require('express');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');
const routeIndex = require('./route/index');
const { fileStorage } = require('./middleware/multerImage');
const { faceAnalize } = require('./controller/analizeFace.controller');

const upload = multer({ dest: 'face/' });

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

app.use(multer({ storage: fileStorage }).single('image'));
app.use(routeIndex);

module.exports = app;
