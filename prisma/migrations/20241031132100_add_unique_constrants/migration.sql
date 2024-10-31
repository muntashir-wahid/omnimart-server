/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `product_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `product_items_sku_key` ON `product_items`(`sku`);
