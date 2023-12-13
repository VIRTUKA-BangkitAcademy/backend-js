// const prisma = require('./prismaClient');
//
// async function seed() {
//   const frameSeedData = [
//     {
//       name: 'Frame 1',
//       linkBuy: 'https://example.com/buy/frame1',
//       image: 'images/frame/1701968869147-money.jpeg',
//       gender: 'FEMALE',
//       face: 'ROUND',
//     },
//     {
//       name: 'Frame 2',
//       linkBuy: 'https://example.com/buy/frame2',
//       image: 'images/frame/1701968869147-money.jpeg',
//       gender: 'FEMALE',
//       face: 'OVAL',
//     },
//
//   ];
//
//   for (const frameData of frameSeedData) {
//     await prisma.frame.create({
//       data: frameData,
//     });
//   }
//
//   await prisma.$disconnect();
// }
//
// seed();
