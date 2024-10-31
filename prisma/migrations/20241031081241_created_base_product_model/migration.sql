-- CreateTable
CREATE TABLE `base_products` (
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `basePrice` DECIMAL(65, 30) NOT NULL,
    `cateoryUid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `productStatus` ENUM('ACTIVE', 'PENDING', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `base_products` ADD CONSTRAINT `base_products_cateoryUid_fkey` FOREIGN KEY (`cateoryUid`) REFERENCES `product_categories`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
