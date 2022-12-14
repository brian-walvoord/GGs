const express = require("express");
const router = express.Router();
const user_ctrl = require("../controllers/UserController.js");

// router.get("/getUsers", user_ctrl.getUsers);
router.get("/getFullName", user_ctrl.getFullName);
router.get("/auth", user_ctrl.auth);
router.post("/signup", user_ctrl.signup);

module.exports = router;
