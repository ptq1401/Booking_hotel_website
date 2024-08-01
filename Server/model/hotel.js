const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-------create Schema user------
const hotelSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: Number, required: true },
  photos: { type: Array, required: true },
  desc: { type: String, required: true },
  rating: { type: Number, required: true },
  featured: { type: Boolean },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  ],
});

//--------exports model-------------
module.exports = mongoose.model("Hotel", hotelSchema);
