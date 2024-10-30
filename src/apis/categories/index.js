const express = require("express");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/category/category.controller");

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:categoryUid")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
