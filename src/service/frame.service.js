const path = require('path');
const prisma = require('../../prisma/prismaClient');
const { ApiError } = require('../../helper/errorApiHandler');

async function getAllFrame() {
  const result = await prisma.frame.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      gender: true,
      face: true,
    },
  });

  if (!result) {
    throw new ApiError(500, 'internal server error', true);
  }

  return result;
}

async function getAllFrameByQuery(face, gender) {
  // your fetch api from python BE

  const result = await prisma.frame.findMany({
    where: {
      face,
      gender,
    },
  });

  if (!result) {
    throw new ApiError(500, 'internal server error', true);
  }

  return result;
}

async function getFrame(id) {
  const result = await prisma.frame.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      linkBuy: true,
      gender: true,
      face: true,
      description: true,
    },
  });

  if (!result) {
    throw new ApiError(400, 'frame not found', true);
  }

  return result;
}

async function createFrame(req) {
  const {
    name, linkBuy, face, gender, description,
  } = req.body;
  const image = req.file.path;
  console.log(image);
  const data = {
    name,
    image,
    linkBuy,
    face: face.toUpperCase(),
    gender: gender.toUpperCase(),
    description,
  };
  const result = await prisma.frame.create({
    data: {
      ...data,
    },
    select: {
      name: true,
      image: true,
      linkBuy: true,
      gender: true,
      face: true,
      description: true,
    },
  });

  return result;
}

async function updateFrame(id, body) {
  const {
    name, linkBuy, image, face, gender,
  } = body;

  const checkExistFrame = await prisma.frame.findUnique({ where: { id } });

  if (!checkExistFrame) {
    throw new Error('Frame Not Found');
  }

  const data = {
    name,
    image,
    linkBuy,
    face: face.toUpperCase(),
    gender: gender.toUpperCase(),
  };

  const result = await prisma.frame.update({
    where: { id },
    data: { ...data },
  });

  if (!result) {
    throw new ApiError(400, 'internal server error', true);
  }

  return result;
}

async function deleteFrameById(id) {
  const result = await prisma.frame.delete({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(400, 'id doesnt exist', true);
  }

  return result;
}

module.exports = {
  getAllFrame,
  getFrame,
  createFrame,
  updateFrame,
  getAllFrameByQuery,
  deleteFrameById,
};
