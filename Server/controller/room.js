const Room = require("../model/room");
const Hotel = require("../model/hotel");
const Transaction = require("../model/transaction");

exports.addRoom = (req, res, next) => {
  const room = new Room(req.body.data);
  room.save();
  Hotel.findById(req.body.hotel_id).then((hotel) => {
    hotel.rooms.push(room._id);
    hotel.save();
  });

  return res.send({
    success: true,
    inform: "Room has been added",
  });
};

exports.getRoom = (req, res, next) => {
  const date = req.body.date;
  if (!date) {
    Hotel.findById(req.body._id)
      .populate("rooms")
      .then((data) => res.send(data.rooms))
      .catch((err) => console.log(err));
    return;
  }
  //-----get room valid -------
  let hotel_id = req.body._id;
  let startDate = date.checkin;
  let endDate = date.checkout;

  const getRoom_CheckOut_Before_StartDate = (id, date) => {
    return Transaction.find({
      hotel: id,
      dateEnd: { $lte: date },
    }).then((result) => result);
  };

  const getRoom_CheckIn_After_EndDate = (id, date) => {
    return Transaction.find({
      hotel: id,
      dateStart: { $gte: date },
    }).then((result) => result);
  };

  const getAllRoom = (id) => {
    return Transaction.find({ hotel: id }).then((result) => {
      let allRoom = [];
      result.forEach((cur) => (allRoom = allRoom.concat(cur.room)));
      return allRoom;
    });
  };

  Promise.all([
    getRoom_CheckIn_After_EndDate(hotel_id, endDate),
    getRoom_CheckOut_Before_StartDate(hotel_id, startDate),
    getAllRoom(hotel_id),
  ])
    .then((result) => {
      // console.log(result);
      let roomValid = [];
      for (let i = 0; i < 2; i++) {
        result[i].forEach((pt) => {
          roomValid = roomValid.concat(pt.room);
        });
      }
      return result[2].filter((cur) => !roomValid.includes(cur));
    })
    .then((list) => {
      // list is unvalid rooms with checkin and checkout
      Hotel.findById(req.body._id)
        .populate("rooms")
        .then((data) => {
          const filterRoom = data.rooms.filter((room) => {
            //------
            room.roomNumber = room.roomNumber.filter(
              (num) => !list.includes(num)
            );
            //----
            if (room.roomNumber.length === 0) return false;
            return true;
          });
          return filterRoom;
        })
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    });
};

exports.getAllRoom = (req, res, next) => {
  Room.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

exports.deleteRoom = (req, res, next) => {
  Transaction.find({ room_id: req.body._id })
    .then((result) => result)
    .then((data) => {
      for (let key in data) {
        if (data[key].status !== "Checkout")
          return res.send({
            success: false,
            inform: "Rooms in use, can't be deleted",
          });
      }
      return Room.findByIdAndDelete({ _id: req.body._id }).then(() =>
        res.send({
          success: true,
          inform: "Deleted",
        })
      );
    })
    .catch((err) => console.log(err));
};
