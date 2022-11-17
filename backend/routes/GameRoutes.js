const express = require("express");
const router = express.Router();
const user_ctrl = require("../controllers/GameController.js");

router.get("/getGames", user_ctrl.getGames);
router.get("/checkIfAdded", user_ctrl.checkIfAdded);
router.get("/getCover", user_ctrl.getCover);
router.get("/getLibrary", user_ctrl.getLibrary);
router.get("/getRating", user_ctrl.getRating);

router.get("/getGraphicsRating", user_ctrl.getGraphicsRating);
router.get("/getSoundRating", user_ctrl.getSoundRating);
router.get("/getGameplayRating", user_ctrl.getGameplayRating);
router.get("/getReplayRating", user_ctrl.getReplayRating);
router.get("/getComments", user_ctrl.getComments);

router.post("/addGame", user_ctrl.addGame);
router.put("/addRating", user_ctrl.addRating);
router.put("/addGraphicsRating", user_ctrl.addGraphicsRating);
router.put("/addSoundRating", user_ctrl.addSoundRating);
router.put("/addGameplayRating", user_ctrl.addGameplayRating);
router.put("/addReplayRating", user_ctrl.addReplayRating);
router.put("/addComments", user_ctrl.addComments);
router.delete("/removeGame", user_ctrl.removeGame);

module.exports = router;
