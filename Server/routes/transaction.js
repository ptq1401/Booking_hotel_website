const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transaction");
router.post("/add-transaction", transactionController.addTransaction);
router.post("/get-transaction", transactionController.getTransaction);
router.get("/get-all", transactionController.getAllTransaction);
module.exports = router;
