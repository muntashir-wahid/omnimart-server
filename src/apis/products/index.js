const express = require("express");

const {
  getAllProducts,
  getProductDetails,
} = require("../../controllers/product/product.controller");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:productSlug").get(getProductDetails);

module.exports = router;
