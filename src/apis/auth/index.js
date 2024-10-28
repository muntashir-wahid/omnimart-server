const express = require("express");

const { login, register } = require("./../../controllers/auth/auth.controller");
const {
  checkUserCredentials,
  encryptPassword,
} = require("../../controllers/auth/middlewares/passwordEncrypt");

const router = express.Router();

router.post("/login", checkUserCredentials, login);
router.post("/register", encryptPassword, register);

module.exports = router;
