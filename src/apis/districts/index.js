const express = require("express");

const regionsRouter = require("./../regions/index");

const {
  getAllDistricts,
  getDistrict,
} = require("./../../controllers/district/district.controller");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllDistricts);
// router.route("/:divisionUid").get(getDistrict);

router.use("/:districtUid/regions", regionsRouter);

module.exports = router;
