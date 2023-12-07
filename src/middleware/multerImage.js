const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}.jpg`); // Menggunakan ekstensi file yang diinginkan (misalnya .jpg)
  },
});

module.exports = {
  fileStorage,
};
