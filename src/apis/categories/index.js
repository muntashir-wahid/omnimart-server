const express = require("express");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/category/category.controller");
const { createSlug } = require("../../middlewares/slugify");

const router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(createSlug("name"), createCategory);

router
  .route("/:categoryUid")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
