const frameService = require('../service/frame.service');

async function getFrames(req, res) {
  try {
    const frame = await frameService.getAllFrame();
    if (frame.length < 1) {
      return res.status(200).json({
        status: 'OK',
        message: 'success get all frame',
        frames: [],
      });
    }
    return res.status(200).json({
      status: 'OK',
      message: 'success get all frame',
      frames: frame,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
}

async function getFrame(req, res) {
  try {
    const frame = await frameService.getFrame(req.params.id);

    return res.status(200).json({
      status: 'OK',
      message: 'success get all frame',
      frame,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

async function createFrame(req, res) {
  try {
    const frame = await frameService.createFrame(req, req.file.path);

    return res.status(201).json({
      status: 'OK',
      message: 'success create data frame',
      frame,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
}

async function updateFrame(req, res) {
  try {
    const frame = await frameService.updateFrame(req.params.id, req.body);

    return res.status(200).json({
      status: 'OK',
      message: 'success update data frame',
      frame,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
}

async function deleteFrameById(req, res) {
  try {
    await frameService.deleteFrameById(req.params.id);

    return res.status(200).json({
      message: `succes delete with id ${req.params.id}`,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

module.exports = {
  getFrame,
  getFrames,
  createFrame,
  updateFrame,
  deleteFrameById,
};
