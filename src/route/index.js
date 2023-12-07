const express = require('express');
const multer = require('multer');
const frameController = require('../controller/frame.controller');
const analizeFace = require('../controller/analizeFace.controller');

const upload = multer({ dest: 'face/' });

const router = new express.Router();

// FRAME
router.get('/api/frames', frameController.getFrames);
router.get('/api/frames/:id', frameController.getFrame);
router.post('/api/frames', frameController.createFrame);

// TESTING
router.post('/faceanalize', analizeFace.faceAnalize);
router.get('/hello', (req, res) => res.json({ message: 'Hello World' }));

module.exports = router;
