const express = require("express");

const {
  getAllRegions,
} = require("./../../controllers/region/region.controller");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllRegions);
// router.route("/:divisionUid").get(getDistrict);

module.exports = router;
