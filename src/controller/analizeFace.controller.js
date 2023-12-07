const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { getAllFrameByQuery } = require('../service/frame.service');

async function faceAnalize(req, res) {
  const imageBuffer = req.file;

  try {
    const data = new FormData();
    data.append('image', fs.createReadStream(imageBuffer.path), {
      filename: imageBuffer.originalname,
      contentType: imageBuffer.mimetype,
    });

    const config = {
      method: 'post',
      url: 'http://34.124.232.67:8080/predict',
      headers: {
        ...data.getHeaders(),
      },
      data,
    };

    const response = await axios.request(config);
    const face = response.data.result;
    const { gender } = req.body;

    const result = await getAllFrameByQuery(face.toUpperCase(), gender.toUpperCase());

    if (result.length < 1) {
      return res.status(200).json({
        message: 'frame for your face not found',
        result: `your face is ${face}`,
        // data: response.data.result,
      });
    }

    return res.status(200).json({
      message: 'success get frame by userFace',
      data: result,
      // data: response.data.result,
    });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(JSON.stringify(error.response.data));
    }

    return res.status(400).json({
      message: 'error',
    });
  }
}

module.exports = {
  faceAnalize,
};
