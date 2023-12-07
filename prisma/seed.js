const prisma = require('./prismaClient');

async function seed() {
  const frameSeedData = [
    {
      name: 'Frame 1',
      linkBuy: 'https://example.com/buy/frame1',
      urlPicture: 'https://example.com/pictures/frame1.jpg',
      gender: 'MALE',
      face: 'ROUND',
    },
    {
      name: 'Frame 2',
      linkBuy: 'https://example.com/buy/frame2',
      urlPicture: 'https://example.com/pictures/frame2.jpg',
      gender: 'FEMALE',
      face: 'OVAL',
    },

  ];

  for (const frameData of frameSeedData) {
    await prisma.frame.create({
      data: frameData,
    });
  }

  await prisma.$disconnect();
}

seed();
