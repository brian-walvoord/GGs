const express = require("express");
const router = express.Router();
const user_ctrl = require("../controllers/GameController.js");

router.get("/getGames", user_ctrl.getGames);
router.get("/getCover", user_ctrl.getCover);
router.get("/getLibrary", user_ctrl.getLibrary);
router.post("/addGame", user_ctrl.addGame);
router.put("/addRating", user_ctrl.addRating);

module.exports = router;
