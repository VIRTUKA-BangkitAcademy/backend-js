const express = require('express');
const faceController = require('../controller/face.controller');
const frameController = require('../controller/frame.controller');

const router = new express.Router();

// FACE
router.post('/api/face', faceController.createFace);

// FRAME
router.get('/api/frames', frameController.getFrames);
router.get('/api/frames/:id', frameController.getFrame);
router.post('/api/frames', frameController.createFrame);

// TESTING
router.get('/hello', (req, res) => res.json({ message: 'Hello World' }));

module.exports = router;
