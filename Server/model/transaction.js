const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-------create Schema user------
const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // user: { type: String, required: true },
  // hotel: { type: String, required: true },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },

  room: { type: Array },
  room_id: { type: String, required: true },
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, required: true },
});

//--------exports model-------------
module.exports = mongoose.model("Transaction", transactionSchema);
