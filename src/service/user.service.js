const passwordHashed = require('password-hash');
const jwt = require('jsonwebtoken');
const prisma = require('../../prisma/prismaClient');
const { ApiError } = require('../../helper/errorApiHandler');
const { validationRequest } = require('../../helper/validation');

async function getAll() {
  const result = await prisma.user.findMany();

  if (!result) {
    throw new ApiError(400, 'error', true);
  }

  return result;
}

async function login(body) {
  const { email, password } = body;

  // const hashPassword = passwordHashed.generate(password);

  const result = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const verify = passwordHashed.verify(password, result.password);
  if (!verify || !result) {
    throw new ApiError(401, 'Wrong email or password');
  }

  const payload = {
    name: result.name,
    email: result.email,
  };

  const secretToken = process.env.JWT_SECRET_TOKEN;
  const expiredToken = 60 * 60;

  const token = jwt.sign(payload, secretToken, { expiresIn: expiredToken });
  const response = {
    name: result.name,
    email: result.email,
    token,
  };

  return response;
}

async function register(body) {
  const { name, email, password } = body;
  const data = {
    name,
    email,
    password,
  };

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new ApiError(400, 'email already taken', true);
  }

  const validatedData = validationRequest(data);
  if (!validatedData.validate()) {
    const errors = validatedData.errors();
    const errorFields = ['email', 'name', 'password'];

    // eslint-disable-next-line no-restricted-syntax
    for (const field of errorFields) {
      if (errors.has(field)) {
        throw new ApiError(401, errors.first(field));
      }
    }
  }

  const hashPassword = passwordHashed.generate(password);
  console.log(hashPassword);
  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  return result;
}

module.exports = {
  getAll,
  register,
  login,
};
