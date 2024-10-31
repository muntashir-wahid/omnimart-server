-- CreateTable
CREATE TABLE `product_items` (
    `uid` VARCHAR(191) NOT NULL,
    `baseProductUid` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `stock` INTEGER NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `discount` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `productItemStatus` ENUM('ACTIVE', 'PENDING', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_configs` (
    `uid` VARCHAR(191) NOT NULL,
    `productItemUid` VARCHAR(191) NULL,
    `attributeValueUid` VARCHAR(191) NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_items` ADD CONSTRAINT `product_items_baseProductUid_fkey` FOREIGN KEY (`baseProductUid`) REFERENCES `base_products`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_configs` ADD CONSTRAINT `product_configs_productItemUid_fkey` FOREIGN KEY (`productItemUid`) REFERENCES `product_items`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_configs` ADD CONSTRAINT `product_configs_attributeValueUid_fkey` FOREIGN KEY (`attributeValueUid`) REFERENCES `attribute_values`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;
