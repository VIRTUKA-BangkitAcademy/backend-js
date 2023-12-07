const multer = require('multer');

const fileStorageFace = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/face/');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

module.exports = {
  fileStorageFace,
};
