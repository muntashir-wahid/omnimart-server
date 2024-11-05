/*
  Warnings:

  - Added the required column `discount` to the `orders_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders_line` ADD COLUMN `discount` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `product_orders` MODIFY `addressUid` VARCHAR(191) NULL;
