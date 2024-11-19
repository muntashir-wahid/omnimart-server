/*
  Warnings:

  - Made the column `addressUid` on table `product_orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `product_orders_addressUid_fkey` ON `product_orders`;

-- AlterTable
ALTER TABLE `product_orders` MODIFY `addressUid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `product_orders` ADD CONSTRAINT `product_orders_addressUid_fkey` FOREIGN KEY (`addressUid`) REFERENCES `addresses`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
