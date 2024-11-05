-- CreateTable
CREATE TABLE `product_orders` (
    `uid` VARCHAR(191) NOT NULL,
    `totalPrice` DECIMAL(65, 30) NOT NULL,
    `deliveryCharge` INTEGER NOT NULL DEFAULT 0,
    `paymentMethod` ENUM('CASH_ON_DELIVERY', 'ONLINE_PAYMENT') NOT NULL DEFAULT 'CASH_ON_DELIVERY',
    `orderStatus` ENUM('ORDER_PLACED', 'ACCEPTED', 'DELIVERED', 'COMPLETED') NOT NULL DEFAULT 'ORDER_PLACED',
    `deliveryMethod` ENUM('HOME_DELIVERY', 'PICK_UP_POINT') NOT NULL DEFAULT 'HOME_DELIVERY',
    `userUid` VARCHAR(191) NOT NULL,
    `addressUid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders_line` (
    `uid` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `qunatity` INTEGER NOT NULL,
    `orderUid` VARCHAR(191) NOT NULL,
    `productUid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_orders` ADD CONSTRAINT `product_orders_userUid_fkey` FOREIGN KEY (`userUid`) REFERENCES `Users`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_line` ADD CONSTRAINT `orders_line_orderUid_fkey` FOREIGN KEY (`orderUid`) REFERENCES `product_orders`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_line` ADD CONSTRAINT `orders_line_productUid_fkey` FOREIGN KEY (`productUid`) REFERENCES `product_items`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
