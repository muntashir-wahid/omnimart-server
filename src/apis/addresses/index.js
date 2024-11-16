const express = require("express");

const {
  getAllAddresses,
  getAddress,
  createAddress,
} = require("../../controllers/address/address.controller");

const { protect } = require("../../middlewares/checkAuth");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllAddresses).post(createAddress);

router.route("/:categorySlug").get(getAddress);
// .patch(updateCategory)
// .delete(deleteCategory);

module.exports = router;
