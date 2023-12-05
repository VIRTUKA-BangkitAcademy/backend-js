const prisma = require('../../prisma/prismaClient');

async function createDataFace(body) {
  // eslint-disable-next-line no-use-before-define
  if (checkExistingDataFace(body)) {
    throw new Error('already face');
  }

  const result = await prisma.face.create({
    select: {
      name: true,
    },
    data: {
      name: body.name,
    },
  });

  return result;
}

async function checkExistingDataFace(body) {
  const result = await prisma.face.findUnique({
    where: {
      name: body.name,
    },
  });

  return result;
}

module.exports = { createDataFace };
