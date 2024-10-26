const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./routers");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", router);

module.exports = app;
