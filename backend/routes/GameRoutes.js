const express = require("express");
const router = express.Router();
const user_ctrl = require("../controllers/GameController.js");

router.get("/getGames", user_ctrl.getGames);
router.get("/checkIfAdded", user_ctrl.checkIfAdded);
router.get("/getCover", user_ctrl.getCover);
router.get("/getLibrary", user_ctrl.getLibrary);
router.get("/getRating", user_ctrl.getRating);
router.post("/addGame", user_ctrl.addGame);
router.put("/addRating", user_ctrl.addRating);
router.delete("/removeGame", user_ctrl.removeGame);

module.exports = router;
