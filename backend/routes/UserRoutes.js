const express = require("express");
const router = express.Router();
const user_ctrl = require("../controllers/UserController.js");

// router.get("/getUsers", user_ctrl.getUsers);
router.get("/getFullName", user_ctrl.getFullName);

module.exports = router;
