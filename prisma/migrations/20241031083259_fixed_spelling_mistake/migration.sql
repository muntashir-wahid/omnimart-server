/*
  Warnings:

  - You are about to drop the column `cateoryUid` on the `base_products` table. All the data in the column will be lost.
  - Added the required column `categoryUid` to the `base_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `base_products` DROP FOREIGN KEY `base_products_cateoryUid_fkey`;

-- AlterTable
ALTER TABLE `base_products` DROP COLUMN `cateoryUid`,
    ADD COLUMN `categoryUid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `base_products` ADD CONSTRAINT `base_products_categoryUid_fkey` FOREIGN KEY (`categoryUid`) REFERENCES `product_categories`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
