const prisma = require('../../prisma/prismaClient');

async function getAllFrame() {
  const result = await prisma.frame.findMany({
    select: {
      name: true,
      urlPicture: true,
      gender: true,
      face: true,
    },
  });

  return result;
}

async function getFrame(id) {
  const result = await prisma.frame.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      name: true,
      urlPicture: true,
      linkBuy: true,
      gender: true,
      face: true,
    },
  });

  if (!result) {
    throw new Error('frame not found');
  }

  return result;
}

async function createFrame(body) {
  const {
    name, linkBuy, urlPicture, face, gender,
  } = body;

  const data = {
    name,
    urlPicture,
    linkBuy,
    face: face.toUpperCase(),
    gender: gender.toUpperCase(),
  };
  const result = await prisma.frame.create({
    data: {
      ...data,
    },
    select: {
      name: true,
      urlPicture: true,
      linkBuy: true,
      gender: true,
      face: true,
    },
  });

  return result;
}

module.exports = {
  getAllFrame,
  getFrame,
  createFrame,
};
