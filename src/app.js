const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./routers");
const errorController = require("./controllers/error/error.controller");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", router);

app.all("*", (req, _, next) => {
  next(
    new Error(
      `Can't find ${req.originalUrl} for ${req.method} method on the server!.`
    )
  );
});

app.use(errorController);

module.exports = app;
