const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const router = require("./routers");
const errorController = require("./controllers/error/error.controller");

const app = express();

const parseCookeAndSetOnHeader = (req, _, next) => {
  const cookie = req.headers.cookie;
  const cookieArr = cookie?.split("; ");

  const accessToken = cookieArr
    ?.find((item) => item.startsWith("ACCESS_TOKEN"))
    .split("=")[1];

  req.headers.authorization = `Bearer ${accessToken}`;

  next();
};

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
// app.use(parseCookeAndSetOnHeader);

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
