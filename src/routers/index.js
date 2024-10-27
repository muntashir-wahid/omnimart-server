const express = require("express");

const authRouter = require("./../apis/auth/index");
const userRouter = require("./../apis/users/index");

const router = express.Router();

const routers = [
  {
    path: "/users",
    api: userRouter,
  },
  {
    path: "/auth",
    api: authRouter,
  },
];

routers.forEach((routerItem) => {
  router.use(routerItem.path, routerItem.api);
});

module.exports = router;
