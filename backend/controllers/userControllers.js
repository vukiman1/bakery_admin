const mongoose = require("mongoose");
const UserModel = require("../models/userModel");

function getUsers(req, res) {
  UserModel.find()
    .then((user) => {
      return res.status(200).json({
        success: true,
        message: "Danh sách người dùng",
        Users: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

function getUser(req, res) {
  const { id } = req.params;

  UserModel.findOne({ id: id })
    .then((user) => {
      return res.status(200).json({
        success: true,
        message: "Sản phẩm",
        User: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

function createdUser(req, res) {
  const user = new UserModel({
    id: req.body.id,
    image: req.body.image,
    username: req.body.username,
    password: req.body.password,
  });

  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "New cause created successfully",
        User: newUser,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}
function updateUser(req, res) {
  const update = {
    id: req.body.id,
    image: req.body.image,
    username: req.body.username,
    password: req.body.password,
  };

  const { id } = req.params;
  const updateObject = req.body;
  UserModel.findOneAndUpdate({ id: id }, update)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Update thành công!",
        updateCourse: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
}
function deletedUser(req, res) {
  const { id } = req.params;

  UserModel.deleteOne({ id: id })
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
}

module.exports = { getUsers, getUser, createdUser, updateUser, deletedUser };
