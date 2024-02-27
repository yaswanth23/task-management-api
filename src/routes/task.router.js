const express = require("express");
const router = express.Router();
const checkJwtAndDecodeToken = require("../middleware/checkJwtAndDecodeToken");
const { TaskController } = require("../controllers");

router.post("/", [checkJwtAndDecodeToken, TaskController.addTask]);

module.exports = router;
