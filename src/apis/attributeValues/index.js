const express = require("express");

const {
  getAttributeValues,
  createAttributeValues,
} = require("./../../controllers/attributeValue/attributeValue.controller");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAttributeValues).post(createAttributeValues);

module.exports = router;
