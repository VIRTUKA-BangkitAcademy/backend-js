const multer = require('multer');

const fileStorageFace = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/face/');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    // const sanitizeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${new Date().getTime()}.${fileExtension}`);
  },
});

module.exports = {
  fileStorageFace,
};
