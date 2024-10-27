const express = require("express");

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./../../controllers/user/user.controller.js");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser).delete(deleteUser);
router.route("/:userId").get(getUser).patch(updateUser);

module.exports = router;
