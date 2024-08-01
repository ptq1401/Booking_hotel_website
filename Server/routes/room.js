const express = require("express");
const router = express.Router();
const roomController = require("../controller/room");
router.post("/add-room", roomController.addRoom);
router.post("/get-room", roomController.getRoom);
router.get("/get-all-room", roomController.getAllRoom);
router.post("/delete-room", roomController.deleteRoom);
module.exports = router;
