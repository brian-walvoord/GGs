const express = require("express");
const router = express.Router();
const user_ctrl = require("../controllers/users/UserController.js");

router.get("/getUsers", user_ctrl.getUsers);

module.exports = router;
