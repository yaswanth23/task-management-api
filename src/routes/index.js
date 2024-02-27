const express = require("express");
const defaultRouter = express.Router();
const { PingController } = require("../controllers");
const authRouter = require("./auth.router");

defaultRouter.get("/ping", [PingController.getPing]);

const init = (app) => {
  app.use("/api", defaultRouter);
  app.use("/api/v1/auth", authRouter);
};

module.exports = init;
