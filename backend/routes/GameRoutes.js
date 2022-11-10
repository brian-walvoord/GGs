const express = require("express");
const router = express.Router();
const user_ctrl = require("../controllers/GameController.js");

router.get("/getGames", user_ctrl.getGames);
router.get("/getCover", user_ctrl.getCover);
router.post("/addGame", user_ctrl.addGame);

module.exports = router;
