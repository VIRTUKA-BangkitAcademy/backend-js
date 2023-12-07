const multer = require('multer');

const fileStorageFrame = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/frame');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

module.exports = {
  fileStorageFrame,
};
