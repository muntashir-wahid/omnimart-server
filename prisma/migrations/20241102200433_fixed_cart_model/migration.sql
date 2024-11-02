-- DropForeignKey
ALTER TABLE `cartitems` DROP FOREIGN KEY `CartItems_cartUid_fkey`;

-- DropForeignKey
ALTER TABLE `cartitems` DROP FOREIGN KEY `CartItems_productUid_fkey`;

-- AddForeignKey
ALTER TABLE `CartItems` ADD CONSTRAINT `CartItems_cartUid_fkey` FOREIGN KEY (`cartUid`) REFERENCES `Cart`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItems` ADD CONSTRAINT `CartItems_productUid_fkey` FOREIGN KEY (`productUid`) REFERENCES `product_items`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
