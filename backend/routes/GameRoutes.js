const express = require("express");
const router = express.Router();
const user_ctrl = require("../controllers/games/GameController.js");

router.get("/getGames", user_ctrl.getGames);

module.exports = router;
