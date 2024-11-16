/*
  Warnings:

  - You are about to drop the column `addressLint` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `addressLint`,
    ADD COLUMN `addressLine` VARCHAR(191) NULL;
