const express = require("express");

const { UserRoles } = require("@prisma/client");

const { createSlug } = require("../../middlewares/slugify");
const { protect, restrictTo } = require("../../middlewares/checkAuth");

const {
  getAllInventory,
  getInventory,
  createInventory,
  getInventoryAllStocks,
  createInventoryStock,
  updateInventoryStock,
} = require("../../controllers/inventory/inventory.controller");
const { upload } = require("../../utils/handleFile");

const router = express.Router();

router.use(protect, restrictTo(UserRoles.ADMIN));

router
  .route("/")
  .get(getAllInventory)
  .post(upload.single("image"), createSlug("name"), createInventory);

router.route("/:inventorySlug").get(getInventory);

router
  .route("/:productUid/stocks")
  .post(upload.single("image"), createInventoryStock)
  .get(getInventoryAllStocks);

router.route("/:productUid/stocks/:sku").patch(updateInventoryStock);

module.exports = router;
