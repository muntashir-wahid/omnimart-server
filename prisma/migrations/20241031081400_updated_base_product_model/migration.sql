/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `base_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `base_products_name_key` ON `base_products`(`name`);
