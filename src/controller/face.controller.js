const faceService = require('../service/face.service');

async function createFace(req, res) {
  try {
    const face = await faceService.createDataFace(req.body);

    return res.status(201).json({
      status: 'OK',
      message: 'success create face',
      face,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
}

module.exports = { createFace };
