const express = require("express");

const {
  getAllAttributes,
  createAttribute,
  getAttribute,
} = require("../../controllers/attribute/attribute.controller");

const router = express.Router();

router.route("/").get(getAllAttributes).post(createAttribute);

router.route("/:categorySlug").get(getAttribute);
// .patch(updateCategory)
// .delete(deleteCategory);

module.exports = router;
