-- CreateTable
CREATE TABLE `dhaka_city` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `bn_name` VARCHAR(191) NOT NULL,
    `district_id` INTEGER NOT NULL,
    `city_corporation` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dhaka_city` ADD CONSTRAINT `dhaka_city_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
