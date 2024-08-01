const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/user");
//-----require router-------
const userRouter = require("./routes/user");
const hotelRouter = require("./routes/hotel");
const roomRouter = require("./routes/room");
const transactionRouter = require("./routes/transaction");
//-----server----------
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//--router--
// app.use((req, res, next) => {
//   User.findById("65f8fd27776a927fe6897a27").then((result) => {
//     console.log("app", result);
//     req.user = result;
//     next();
//   });
// });
app.use(userRouter);
app.use(hotelRouter);
app.use(roomRouter);
app.use(transactionRouter);
//-------------------------
mongoose
  .connect(
    "mongodb+srv://moonnie:nYNadjCW2W9ZWiiC@assiment.z4ayje8.mongodb.net/data?retryWrites=true&w=majority&appName=assiment"
  )
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
