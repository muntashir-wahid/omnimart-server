const express = require("express");

const {
  getAllDivisions,
  getDivision,
} = require("./../../controllers/division/division.controller");

const router = express.Router();

router.route("/").get(getAllDivisions);
router.route("/:divisionUid").get(getDivision);

module.exports = router;
