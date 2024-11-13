-- CreateTable
CREATE TABLE `districts` (
    `id` INTEGER NOT NULL,
    `division_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bn_name` VARCHAR(191) NULL,
    `lat` DECIMAL(65, 30) NOT NULL,
    `long` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `districts` ADD CONSTRAINT `districts_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `divisions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
