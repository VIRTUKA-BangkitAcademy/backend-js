/*
  Warnings:

  - You are about to drop the column `urlPicture` on the `frame` table. All the data in the column will be lost.
  - You are about to alter the column `linkBuy` on the `frame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(100)`.
  - The values [HEART] on the enum `frame_face` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[id]` on the table `frame` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `frame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `frame` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `frame_name_key` ON `frame`;

-- AlterTable
ALTER TABLE `frame` DROP COLUMN `urlPicture`,
    ADD COLUMN `description` VARCHAR(500) NOT NULL,
    ADD COLUMN `image` VARCHAR(100) NOT NULL,
    MODIFY `linkBuy` VARCHAR(100) NOT NULL,
    MODIFY `face` ENUM('DIAMOND', 'OBLONG', 'OVAL', 'ROUND', 'SQUARE', 'TRIANGLE') NOT NULL;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `frame_id_key` ON `frame`(`id`);
