const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-------create Schema user------
const roomSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  maxPeople: { type: Number, required: true },
  desc: { type: String, required: true },
  roomNumber: { type: Array },
});

//--------exports model-------------
module.exports = mongoose.model("Room", roomSchema);
