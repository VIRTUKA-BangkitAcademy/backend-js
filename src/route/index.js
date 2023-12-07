const express = require('express');
const multer = require('multer');
const frameController = require('../controller/frame.controller');
const analizeFace = require('../controller/analizeFace.controller');
const { fileStorageFace } = require('../middleware/faceMulter');
const { fileStorageFrame } = require('../middleware/frameMulter');

const router = new express.Router();

// FRAME
router.get('/api/frames', frameController.getFrames);

router.get('/api/frames/:id', frameController.getFrame);
router.post('/api/frames', multer({ storage: fileStorageFrame }).single('image'), frameController.createFrame);
router.patch('/api/frames/:id', multer({ storage: fileStorageFrame }).single('image'), frameController.updateFrame);

// FACE ANALIZE
router.post('/faceanalize', multer({ storage: fileStorageFace }).single('image'), analizeFace.faceAnalize);
router.get('/hello', (req, res) => res.json({ message: 'Hello World' }));

module.exports = router;
