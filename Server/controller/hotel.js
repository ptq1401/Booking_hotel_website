const Hotel = require("../model/hotel");
const mongoose = require("mongoose");
const Room = require("../model/room");
const Transaction = require("../model/transaction");
//-----------------------------------------------------
exports.addHotel = (req, res, next) => {
  const hotel = new Hotel(req.body);
  hotel.save();
  return res.send({
    success: true,
    inform: `${req.body.name} has been added`,
  });
};

exports.editHotel = (req, res, next) => {
  Hotel.findById(req.body._id)
    .then((hotel) => {
      const updateHotel = req.body.hotel;
      for (let key in updateHotel) {
        hotel[key] = updateHotel[key];
      }
      hotel.save();
    })
    .then(() =>
      res.send({
        success: true,
        inform: `Hotel has been edited`,
      })
    );
};

exports.getHotel = (req, res, next) => {
  Hotel.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

exports.getQuantityHotel = (req, res, next) => {
  //getQuantityHotel
  let data = {
    hotelByArea: {},
    hotelByType: {},
    topRating: [],
  };
  Hotel.find()
    .then((result) => {
      const area = new Object();
      const type = new Object();
      result.forEach((cur) => {
        //by Area
        if (area[`${cur.city}`]) {
          area[`${cur.city}`]++;
        } else area[`${cur.city}`] = 1;
        //by Type
        if (type[`${cur.type}`]) {
          type[`${cur.type}`]++;
        } else type[`${cur.type}`] = 1;
      });
      //---------------------------------------------------------------
      data.hotelByArea = [
        {
          name: "TP Ho Chi Minh",
          properties: area.tphcm,
          image:
            "https://img.daibieunhandan.vn/resize/800x800/Files/Images/2022/08/06/1-1659788321127.jpeg",
        },
        {
          name: "Ha Noi",
          properties: area.hanoi,
          image:
            "https://statics.vinpearl.com/dia-diem-du-lich-ha-noi-4_1688468952.jpg",
        },
        {
          name: "Da Nang",
          properties: area.danang,
          image:
            "https://media.vneconomy.vn/w800/images/upload/2022/01/18/du-lich-dn-2.jpg",
        },
      ];
      //----------------------------------------------------------------
      data.hotelByType = [
        { name: "Hotels", quantity: type.hotel, image: "./images/type_1.webp" },
        {
          name: "Apartments",
          quantity: type.apartment,
          image: "./images/type_2.jpg",
        },
        {
          name: "Resorts",
          quantity: type.resort,
          image: "./images/type_3.jpg",
        },
        { name: "Villas", quantity: type.villas, image: "./images/type_4.jpg" },
        { name: "Cabins", quantity: type.cabin, image: "./images/type_5.jpg" },
      ];
      //---------------------------------------------------------------
      const hotelList = result.filter((cur) => cur.type === "Hotel");
      const top3Hotel = hotelList
        .sort((a, b) => b.rating - a.rating)
        .splice(0, 3);
      top3Hotel.forEach((cur, i) => {
        data.topRating.push({
          name: cur.name,
          rate: cur.rating,
          image: cur.photos[i],
          id: cur._id,
        });
      });
      return data.topRating;
    })
    .then((data) => {
      //----------get min price of 3 hotels top rating----------------
      const getMinPrice = (id) => {
        return Hotel.findById(id)
          .populate("rooms", "price")
          .then((result) => result.rooms)
          .then((data) => {
            data.sort((a, b) => a.price - b.price);
            return data[0].price;
          });
      };
      return Promise.all([
        getMinPrice(data[0].id),
        getMinPrice(data[1].id),
        getMinPrice(data[2].id),
      ]);
    })
    .then((result) => {
      data.topRating[0].price = result[0];
      data.topRating[1].price = result[1];
      data.topRating[2].price = result[2];
      return data;
    })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

//------------------------------
exports.getHotelByOption = (req, res, next) => {
  // console.log(req.body);
  // hàm xử lí kết hợp với api "/get-room" để xác định số phòng còn phù hợp theo thời gian checkin&out
  const getValidRoom = async (id, start, end) => {
    const result = await fetch("http://localhost:5000/get-room", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        date: { checkin: start, checkout: end },
      }),
    });
    const room = await result.json(); // lấy danh sách phòng hợp lệ
    //lấy thông tin khách sạn
    const hotel = await Hotel.findOne({ _id: id });
    const data = { hotel: hotel, room: room };
    return data;
  };
  let arrayFunction = [];
  const city = req.body.city;
  Hotel.find({ city: city })
    .then((result) => {
      result.forEach((cur) =>
        arrayFunction.push(
          getValidRoom(cur._id, req.body.checkin, req.body.checkout)
        )
      );
      return Promise.all(arrayFunction);
    })
    .then((data) => {
      let resArray = [];
      data.forEach((cur) => {
        const quantity = cur.room.reduce(
          (total, room) => total + room.roomNumber.length,
          0
        );
        if (quantity >= req.body.room) resArray.push(cur.hotel);
      });
      return res.send(resArray);
    })
    .catch((err) => console.log(err));
};
//----------------------------

exports.getDetailHotel = (req, res, next) => {
  Hotel.findById(req.body.hotel_id)
    .populate("rooms", "price")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

exports.deleteHotel = (req, res, next) => {
  Transaction.find({ hotel: req.body._id })
    .then((result) => result)
    .then((data) => {
      for (let key in data) {
        if (data[key].status !== "Checkout")
          return res.send({
            success: false,
            inform: "Hotels have rooms in use, can't be deleted",
          });
      }
      return Hotel.findByIdAndDelete({ _id: req.body._id }).then(() =>
        res.send({
          success: true,
          inform: "Deleted",
        })
      );
    })
    .catch((err) => console.log(err));
};
