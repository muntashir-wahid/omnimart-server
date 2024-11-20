/*
  Warnings:

  - Added the required column `userAddressUid` to the `product_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_orders` ADD COLUMN `userAddressUid` VARCHAR(191) NOT NULL,
    MODIFY `addressUid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `product_orders` ADD CONSTRAINT `product_orders_userAddressUid_fkey` FOREIGN KEY (`userAddressUid`) REFERENCES `user_addresses`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
