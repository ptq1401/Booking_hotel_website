const Transaction = require("../model/transaction");
const Hotel = require("../model/hotel");
exports.addTransaction = (req, res, next) => {
  const data = req.body.data;
  const trans_data = {
    user: data.user,
    hotel: data.hotel,
    dateStart: data.date.checkin,
    dateEnd: data.date.checkout,
    payment: data.payment,
    status: "Booked",
    room: [],
    room_id: "",
    price: "",
  };
  const time =
    (new Date(data.date.checkout) - new Date(data.date.checkin)) / 86400000;
  data.roomReserve.map((cur) => {
    trans_data.room = cur.roomNumber;
    trans_data.room_id = cur.room_id;
    trans_data.price = cur.roomNumber.length * cur.price * time;
    const transaction = new Transaction(trans_data);
    transaction.save();
  });
  return res.send({
    success: true,
    inform: `Booked`,
  });
};

exports.getTransaction = (req, res, next) => {
  Transaction.find({ user: req.body.user_id })
    .populate("hotel", "name")
    .then((result) => res.send(result.reverse()))
    .catch((err) => console.log(err));
};

exports.getAllTransaction = (req, res, next) => {
  Transaction.find()
    .populate({
      path: "hotel",
      select: "name",
    })
    .populate({
      path: "user",
      select: "userName",
    })
    .then((result) => res.send(result.reverse()))
    .catch((err) => console.log(err));
};
