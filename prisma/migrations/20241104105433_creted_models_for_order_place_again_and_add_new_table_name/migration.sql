/*
  Warnings:

  - You are about to drop the `cartitems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cartitems` DROP FOREIGN KEY `CartItems_cartUid_fkey`;

-- DropForeignKey
ALTER TABLE `cartitems` DROP FOREIGN KEY `CartItems_productUid_fkey`;

-- DropTable
DROP TABLE `cartitems`;

-- CreateTable
CREATE TABLE `cart_items` (
    `uid` VARCHAR(191) NOT NULL,
    `cartUid` VARCHAR(191) NOT NULL,
    `productUid` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cartUid_fkey` FOREIGN KEY (`cartUid`) REFERENCES `Cart`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_productUid_fkey` FOREIGN KEY (`productUid`) REFERENCES `product_items`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
