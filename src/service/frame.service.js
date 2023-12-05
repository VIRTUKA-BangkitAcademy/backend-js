const prisma = require('../../prisma/prismaClient');

async function getAllFrame() {
  const result = await prisma.frame.findMany({
    include: {
      face: {
        select: { name: true },
      },
    },
  });

  return result;
}

async function getFrame(id) {
  const result = await prisma.frame.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      face: {
        select: { name: true },
      },
    },
  });

  if (!result) {
    throw new Error('frame not found');
  }

  return result;
}

async function createFrame(body) {
  const {
    name, link, picture, faceId, gender,
  } = body;

  const data = {
    name,
    picture,
    link,
    face: { connect: { id: faceId } },
    gender,
  };
  const result = await prisma.frame.create({
    data: {
      ...data,
    },
  });

  return result;
}

module.exports = {
  getAllFrame,
  getFrame,
  createFrame,
};
