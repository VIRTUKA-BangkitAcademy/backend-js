const axios = require('axios');

async function faceAnalize(req, res) {
  const imageBuffer = req.file;
  try {
    const images = `http://localhost:8001/images/${imageBuffer.filename}`;

    const respon = await axios.post('http://34.124.232.67:8080/predict', { image: images })
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });

    return res.status(200).json({
      message: 'success',
      face: respon,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: 'error',
    });
  }
}

module.exports = {
  faceAnalize,
};
