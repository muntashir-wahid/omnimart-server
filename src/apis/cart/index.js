const express = require("express");

const { UserRoles } = require("@prisma/client");

const {
  getCart,
  createCart,
} = require("../../controllers/cart/cart.controller.js");

const { protect, restrictTo } = require("../../middlewares/checkAuth.js");
const { checkStockAndUser } = require("../../middlewares/checkForCart.js");

const router = express.Router();

router.use(protect, restrictTo(UserRoles.USER));

router.route("/").get(getCart).post(checkStockAndUser, createCart);

module.exports = router;
