const express = require("express");
const defaultRouter = express.Router();
const { PingController } = require("../controllers");

defaultRouter.get("/ping", [PingController.getPing]);

const init = (app) => {
  app.use("/api", defaultRouter);
};

module.exports = init;
