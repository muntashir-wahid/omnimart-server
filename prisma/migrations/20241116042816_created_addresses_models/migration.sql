-- CreateTable
CREATE TABLE `addresses` (
    `uid` VARCHAR(191) NOT NULL,
    `divisionId` INTEGER NOT NULL,
    `districtId` INTEGER NOT NULL,
    `upazilaId` INTEGER NULL,
    `dhakaCityId` INTEGER NULL,
    `addressLint` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL DEFAULT 'Bangladesh',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `addressStatus` ENUM('ACTIVE', 'PENDING', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_addresses` (
    `uid` VARCHAR(191) NOT NULL,
    `addressUid` VARCHAR(191) NOT NULL,
    `userUid` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `addressStatus` ENUM('ACTIVE', 'PENDING', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_divisionId_fkey` FOREIGN KEY (`divisionId`) REFERENCES `divisions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_dhakaCityId_fkey` FOREIGN KEY (`dhakaCityId`) REFERENCES `dhaka_city`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_upazilaId_fkey` FOREIGN KEY (`upazilaId`) REFERENCES `upazilas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_addressUid_fkey` FOREIGN KEY (`addressUid`) REFERENCES `addresses`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_userUid_fkey` FOREIGN KEY (`userUid`) REFERENCES `Users`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
