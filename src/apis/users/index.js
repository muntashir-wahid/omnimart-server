const express = require("express");

const { UserRoles } = require("@prisma/client");

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./../../controllers/user/user.controller.js");
const {
  encryptPassword,
} = require("../../controllers/auth/middlewares/passwordEncrypt.js");
const {
  restrictTo,
  protect,
} = require("../../controllers/auth/middlewares/checkAuth.js");

const router = express.Router();

router.use(protect, restrictTo(UserRoles.SUPER_ADMIN));

router.route("/").get(getAllUsers).post(encryptPassword, createUser);

router.route("/:userUid").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
