const express = require("express");
const router = express.Router();
const checkJwtAndDecodeToken = require("../middleware/checkJwtAndDecodeToken");
const { TaskController } = require("../controllers");

router.post("/", [checkJwtAndDecodeToken, TaskController.addTask]);
router.patch("/", [checkJwtAndDecodeToken, TaskController.updateTaskStatus]);
router.delete("/:taskId", [checkJwtAndDecodeToken, TaskController.deleteTask]);
router.get("/", [checkJwtAndDecodeToken, TaskController.getTasksList]);

module.exports = router;
