-- CreateTable
CREATE TABLE `divisions` (
    `uid` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bn_name` VARCHAR(191) NULL,
    `lat` DECIMAL(65, 30) NOT NULL,
    `long` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
