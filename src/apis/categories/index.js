const express = require("express");

const { createSlug } = require("../../middlewares/slugify");
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/category/category.controller");
const {
  getAllAttributes,
} = require("../../controllers/attribute/attribute.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(createSlug("name"), createCategory);

router
  .route("/:categorySlug")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

router.route("/:categoryUid/attributes").get(getAllAttributes);

module.exports = router;
