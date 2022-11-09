const express = require("express");
const router = express.Router();
const user_ctrl = require("../controllers/GameController.js");

router.get("/getGames", user_ctrl.getGames);
router.get("/getCover", user_ctrl.getCover);

module.exports = router;
