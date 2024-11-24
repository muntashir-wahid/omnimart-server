-- DropForeignKey
ALTER TABLE `product_configs` DROP FOREIGN KEY `product_configs_attributeValueUid_fkey`;

-- DropForeignKey
ALTER TABLE `product_configs` DROP FOREIGN KEY `product_configs_productItemUid_fkey`;

-- DropForeignKey
ALTER TABLE `product_images` DROP FOREIGN KEY `product_images_baseProductUid_fkey`;

-- DropForeignKey
ALTER TABLE `product_images` DROP FOREIGN KEY `product_images_imageUid_fkey`;

-- DropForeignKey
ALTER TABLE `product_images` DROP FOREIGN KEY `product_images_productItemUid_fkey`;

-- DropForeignKey
ALTER TABLE `product_items` DROP FOREIGN KEY `product_items_baseProductUid_fkey`;

-- AddForeignKey
ALTER TABLE `product_items` ADD CONSTRAINT `product_items_baseProductUid_fkey` FOREIGN KEY (`baseProductUid`) REFERENCES `base_products`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_configs` ADD CONSTRAINT `product_configs_productItemUid_fkey` FOREIGN KEY (`productItemUid`) REFERENCES `product_items`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_configs` ADD CONSTRAINT `product_configs_attributeValueUid_fkey` FOREIGN KEY (`attributeValueUid`) REFERENCES `attribute_values`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_imageUid_fkey` FOREIGN KEY (`imageUid`) REFERENCES `media_room`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_baseProductUid_fkey` FOREIGN KEY (`baseProductUid`) REFERENCES `base_products`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_productItemUid_fkey` FOREIGN KEY (`productItemUid`) REFERENCES `product_items`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
