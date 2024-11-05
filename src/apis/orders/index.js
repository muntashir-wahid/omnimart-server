const express = require("express");

const {
  getAllOrders,
  createOrder,
  getOrder,
} = require("../../controllers/order/order.controller");

const { restrictTo, protect } = require("../../middlewares/checkAuth.js");
const { UserRoles } = require("@prisma/client");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getAllOrders)
  .post(restrictTo(UserRoles.USER), createOrder);

router.route("/:orderUid").get(getOrder);

module.exports = router;
