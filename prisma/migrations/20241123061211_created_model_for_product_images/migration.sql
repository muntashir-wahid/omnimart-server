-- CreateTable
CREATE TABLE `media_room` (
    `uid` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_images` (
    `uid` VARCHAR(191) NOT NULL,
    `baseProductUid` VARCHAR(191) NULL,
    `productItemUid` VARCHAR(191) NULL,
    `imageUid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_imageUid_fkey` FOREIGN KEY (`imageUid`) REFERENCES `media_room`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_baseProductUid_fkey` FOREIGN KEY (`baseProductUid`) REFERENCES `base_products`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_productItemUid_fkey` FOREIGN KEY (`productItemUid`) REFERENCES `product_items`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;
