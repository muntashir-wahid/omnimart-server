/*
  Warnings:

  - The primary key for the `divisions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `divisions` table. All the data in the column will be lost.
  - Added the required column `id` to the `divisions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `divisions` DROP PRIMARY KEY,
    DROP COLUMN `uid`,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);
