const multer = require('multer');

const fileStorageFrame = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/frame');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    // const sanitizeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${new Date().getTime()}.${fileExtension}`);
  },
});

module.exports = {
  fileStorageFrame,
};
