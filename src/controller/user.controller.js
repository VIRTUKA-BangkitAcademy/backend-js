const userService = require('../service/user.service');

async function login(req, res) {
  try {
    const user = await userService.login(req.body);

    return res.status(200).json({
      message: 'login success',
      user,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
}

async function register(req, res) {
  try {
    const user = await userService.register(req.body);

    return res.status(200).json({
      message: 'register success',
      user,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
}

async function getAll(req, res) {
  try {
    const users = await userService.getAll();

    return res.status(200).json({
      message: 'get all users success',
      users,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
}

module.exports = {
  login,
  register,
  getAll,
};
