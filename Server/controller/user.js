const User = require("../model/user");

//------------function controller--------------------
exports.register = (req, res, next) => {
  const userRegister = req.body;
  User.findOne({ userName: userRegister.userName })
    .then((result) => {
      if (result) {
        return res.send({ inform: "Username already exists", success: false });
      } else {
        const newUser = new User(userRegister);
        newUser.save();
        return res.send({ inform: "User is created", success: true });
      }
    })
    .catch((err) => console.log(err));
};

exports.login = (req, res, next) => {
  const userLogin = req.body;
  User.findOne({ userName: userLogin.userName })
    .then((result) => {
      if (!result) {
        return res.send({ inform: "Username doesn't exists", success: false });
      } else {
        if (result.password === userLogin.password) {
          return res.send({ _id: result._id.toString(), success: true });
        } else
          return res.send({
            inform: "Password error",
            success: false,
          });
      }
    })
    .catch((err) => console.log(err));
};

exports.getUser = (req, res, next) => {
  User.findById(req.body._id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

exports.loginAdmin = (req, res, next) => {
  const userLogin = req.body;
  User.findOne({ userName: userLogin.userName })
    .then((result) => {
      if (!result) {
        return res.send({ inform: "Username doesn't exists", success: false });
      } else {
        if (result.password !== userLogin.password) {
          return res.send({ inform: "Password error", success: false });
        } else if (result.isAdmin) {
          return res.send({ success: true });
        } else
          return res.send({
            inform: "User isn't Admin",
            success: false,
          });
      }
    })
    .catch((err) => console.log(err));
};

exports.getAllUser = (req, res, next) => {
  User.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};
//-------------------------------create accout admin---------------------------------
// const mongoose = require("mongoose");
// const User = require("../model/user");
// mongoose.connect(
//   "mongodb+srv://moonnie:nYNadjCW2W9ZWiiC@assiment.z4ayje8.mongodb.net/data?retryWrites=true&w=majority&appName=assiment"
// );

// const admin = new User({
//   userName: "admin",
//   password: "123456",
//   fullName: "admin",
//   phoneNumber: 123456789,
//   email: "admin@gmail.com",
//   isAdmin: true,
// });

// admin.save();
