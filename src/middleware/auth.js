const jwt = require('jsonwebtoken');

const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token Needed!',
    });
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET_TOKEN;

  try {
    const jwtDecode = jwt.verify(token, secret);
    req.user = jwtDecode;
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  next();
};

module.exports = {
  accessValidation,
};
