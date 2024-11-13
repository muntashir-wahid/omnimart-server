-- CreateTable
CREATE TABLE `upazilas` (
    `id` INTEGER NOT NULL,
    `district_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bn_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `upazilas` ADD CONSTRAINT `upazilas_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
