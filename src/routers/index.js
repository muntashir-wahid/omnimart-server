const express = require("express");

const authRouter = require("./../apis/auth/index");
const attributeRouter = require("./../apis/attributes/index");
const categoryRouter = require("./../apis/categories/index");
const customerRouter = require("./../apis/customers/index");
const inventoryRouter = require("./../apis/inventory/index");
const productsRouter = require("./../apis/products/index");
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
  {
    path: "/categories",
    api: categoryRouter,
  },
  {
    path: "/attributes",
    api: attributeRouter,
  },
  {
    path: "/customers",
    api: customerRouter,
  },
  {
    path: "/inventory",
    api: inventoryRouter,
  },
  {
    path: "/products",
    api: productsRouter,
  },
];

routers.forEach((routerItem) => {
  router.use(routerItem.path, routerItem.api);
});

module.exports = router;
