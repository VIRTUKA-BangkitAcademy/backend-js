const fs = require('fs');
const prisma = require('../../prisma/prismaClient');
const { ApiError } = require('../../helper/errorApiHandler');

async function getAllFrame(req) {
  const { size, page } = req.query;

  const frameQueryOptions = {
    select: {
      id: true,
      name: true,
      image: true,
      gender: true,
      face: true,
    },
  };

  if (size !== undefined && page !== undefined) {
    frameQueryOptions.take = Number(size);
    frameQueryOptions.skip = Number(page);
  }

  const result = await prisma.frame.findMany(frameQueryOptions);

  if (!result || result.length === 0) {
    throw new ApiError(500, 'Internal server error', true);
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
    throw new ApiError(404, 'frame not found', true);
  }

  return result;
}

async function createFrame(req) {
  const {
    name, linkBuy, face, gender, description,
  } = req.body;
  const image = req.file.path;
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

async function updateFrame(id, req) {
  const {
    name, linkBuy, face, gender, description,
  } = req.body;

  const frame = await prisma.frame.findUnique({ where: { id } });
  if (!frame) {
    throw new ApiError(404, 'Frame Not Found', true);
  }

  let image = req.file;
  if (!(image === undefined)) {
    image = req.file.path;
    const pathImage = frame.image;
    fs.unlinkSync(pathImage);
  }

  const updatedData = {
    name,
    image,
    linkBuy,
    description,
  };

  if (face !== undefined) {
    updatedData.face = face.toUpperCase();
  }

  if (gender !== undefined) {
    updatedData.gender = gender.toUpperCase();
  }

  const result = await prisma.frame.update({
    where: { id },
    data: updatedData,
  });

  if (!result) {
    throw new ApiError(400, 'Failed to update frame', true);
  }

  return result;
}

async function deleteFrameById(id) {
  const frame = await getFrame(id);
  if (!frame) {
    throw new ApiError(404, 'frame not found', true);
  }

  const pathImage = frame.image;
  fs.unlinkSync(pathImage);

  const result = await prisma.frame.delete({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(404, 'frame doesnt exist', true);
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
