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
} = require("../../controllers/inventory/inventory.controller");

const router = express.Router();

router.use(protect, restrictTo(UserRoles.ADMIN));

router
  .route("/")
  .get(getAllInventory)
  .post(createSlug("name"), createInventory);

router.route("/:inventorySlug").get(getInventory);

router
  .route("/:productUid/stocks")
  .post(createInventoryStock)
  .get(getInventoryAllStocks);

module.exports = router;
