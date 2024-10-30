const express = require("express");

const {
  getAllAttributes,
  createAttribute,
  getAttribute,
} = require("../../controllers/attribute/attribute.controller");

const attributeValuesRouter = require("./../../apis/attributeValues/index");

const router = express.Router();

router.use("/:attributeUid/values", attributeValuesRouter);

router.route("/").get(getAllAttributes).post(createAttribute);

router.route("/:categorySlug").get(getAttribute);
// .patch(updateCategory)
// .delete(deleteCategory);

module.exports = router;
