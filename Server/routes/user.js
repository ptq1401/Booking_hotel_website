const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/login-admin", userController.loginAdmin);
router.post("/get-user", userController.getUser);
router.get("/get-all-user", userController.getAllUser);
module.exports = router;
