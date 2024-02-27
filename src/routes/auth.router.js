const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");

router.post("/signup", [AuthController.signup]);

module.exports = router;
