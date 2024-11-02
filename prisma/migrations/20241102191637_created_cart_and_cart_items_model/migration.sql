-- CreateTable
CREATE TABLE `Cart` (
    `uid` VARCHAR(191) NOT NULL,
    `userUid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItems` (
    `uid` VARCHAR(191) NOT NULL,
    `cartUid` VARCHAR(191) NOT NULL,
    `productUid` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userUid_fkey` FOREIGN KEY (`userUid`) REFERENCES `Users`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItems` ADD CONSTRAINT `CartItems_cartUid_fkey` FOREIGN KEY (`cartUid`) REFERENCES `Cart`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItems` ADD CONSTRAINT `CartItems_productUid_fkey` FOREIGN KEY (`productUid`) REFERENCES `product_items`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
