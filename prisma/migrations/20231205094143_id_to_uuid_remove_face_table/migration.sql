-- CreateTable
CREATE TABLE `frame` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `linkBuy` VARCHAR(200) NOT NULL,
    `urlPicture` VARCHAR(200) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `face` ENUM('DIAMOND', 'HEART', 'OBLONG', 'OVAL', 'ROUND', 'SQUARE', 'TRIANGLE') NOT NULL,

    UNIQUE INDEX `frame_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
