const express = require('express');
const multer = require('multer');
const frameController = require('../controller/frame.controller');
const analizeFace = require('../controller/analizeFace.controller');
const userController = require('../controller/user.controller');
const { fileStorageFace } = require('../middleware/faceMulter');
const { fileStorageFrame } = require('../middleware/frameMulter');
const { accessValidation } = require('../middleware/auth');

const router = new express.Router();
// TEST SERVER
router.get('/hello', (req, res) => res.json({ message: 'Hello World' }));

// Users
router.post('/api/users/login', userController.login);
router.post('/api/users', userController.register);
router.get('/api/users', userController.getAll);

// FRAME
router.use(accessValidation);
router.get('/api/frames', frameController.getFrames);
router.get('/api/frames/:id', frameController.getFrame);
router.delete('/api/frames/:id', frameController.deleteFrameById);
router.post('/api/frames', multer({ storage: fileStorageFrame }).single('image'), frameController.createFrame);
router.patch('/api/frames/:id', multer({ storage: fileStorageFrame }).single('image'), frameController.updateFrame);

// FACE ANALIZE
router.post('/faceanalize', multer({ storage: fileStorageFace }).single('image'), analizeFace.faceAnalize);

module.exports = router;
