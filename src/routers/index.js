const express = require("express");

const userRouter = require("./../apis/users/index");

const router = express.Router();

const routers = [
  {
    path: "/users",
    api: userRouter,
  },
];

routers.forEach((routerItem) => {
  router.use(routerItem.path, routerItem.api);
});

module.exports = router;
