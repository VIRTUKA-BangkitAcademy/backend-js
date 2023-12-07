const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function faceAnalize(req, res) {
  const imageBuffer = req.file;

  try {
    const data = new FormData();
    data.append("image", fs.createReadStream(imageBuffer.path), {
      filename: imageBuffer.originalname,
      contentType: imageBuffer.mimetype,
    });

    const config = {
      method: "post",
      url: "http://34.124.232.67:8080/predict",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));

    return res.status(200).json({
      message: "success",
      face: response.data,
    });
  } catch (error) {
    console.error(error);

    if (error.response) {
      // Jika respons dari server ada, tampilkan pesan kesalahan dari server
      console.error(JSON.stringify(error.response.data));
    }

    return res.status(400).json({
      message: "error",
    });
  }
}

module.exports = {
  faceAnalize,
};
