const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-------create Schema user------
const userSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

//--------exports model-------------
module.exports = mongoose.model("User", userSchema);
