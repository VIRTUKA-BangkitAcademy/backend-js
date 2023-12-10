const multer = require('multer');

const fileStorageFace = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/face/');
  },
  filename: (req, file, cb) => {
    const sanitizeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${new Date().getTime()}-${sanitizeName}`);
  },
});

module.exports = {
  fileStorageFace,
};
