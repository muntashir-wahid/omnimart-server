const express = require("express");

const { protect, restrictTo } = require("../../middlewares/checkAuth");
const { UserRoles } = require("@prisma/client");

const {
  getAllCustomers,
  getCustomer,
} = require("./../../controllers/customer/customer.controller");

const router = express.Router();

router.use(protect, restrictTo(UserRoles.ADMIN));

router.route("/").get(getAllCustomers);
router.route("/:customerUid").get(getCustomer);
// .patch(updateUser).delete(deleteUser);

module.exports = router;
