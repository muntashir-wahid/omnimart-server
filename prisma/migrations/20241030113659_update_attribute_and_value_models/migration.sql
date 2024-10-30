/*
  Warnings:

  - You are about to drop the column `slug` on the `attribute_values` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `product_attributes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `attribute_values_name_key` ON `attribute_values`;

-- DropIndex
DROP INDEX `product_attributes_name_key` ON `product_attributes`;

-- AlterTable
ALTER TABLE `attribute_values` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `product_attributes` DROP COLUMN `slug`;
