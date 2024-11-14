const express = require("express");

const districtsRouter = require("./../districts/index");
const {
  getAllDivisions,
  getDivision,
} = require("./../../controllers/division/division.controller");

const router = express.Router();

router.route("/").get(getAllDivisions);
router.route("/:divisionUid").get(getDivision);

router.use("/:divisionUid/districts", districtsRouter);

module.exports = router;
