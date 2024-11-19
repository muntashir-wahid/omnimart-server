-- DropForeignKey
ALTER TABLE `product_orders` DROP FOREIGN KEY `product_orders_addressUid_fkey`;

-- AlterTable
ALTER TABLE `product_orders` MODIFY `addressUid` VARCHAR(191) NULL;
