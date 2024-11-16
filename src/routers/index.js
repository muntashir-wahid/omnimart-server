const express = require("express");

const addressRouter = require("./../apis/addresses/index");
const authRouter = require("./../apis/auth/index");
const attributeRouter = require("./../apis/attributes/index");
const cartRouter = require("./../apis/cart/index");
const categoryRouter = require("./../apis/categories/index");
const customerRouter = require("./../apis/customers/index");
const divisionRouter = require("./../apis/divisions/index");
const districtRouter = require("./../apis/districts/index");
const inventoryRouter = require("./../apis/inventory/index");
const orderRouter = require("./../apis/orders/index");
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
    path: "/divisions",
    api: divisionRouter,
  },
  {
    path: "/districts",
    api: districtRouter,
  },
  {
    path: "/addresses",
    api: addressRouter,
  },
  {
    path: "/inventory",
    api: inventoryRouter,
  },
  {
    path: "/products",
    api: productsRouter,
  },
  {
    path: "/cart",
    api: cartRouter,
  },
  {
    path: "/orders",
    api: orderRouter,
  },
];

routers.forEach((routerItem) => {
  router.use(routerItem.path, routerItem.api);
});

module.exports = router;
