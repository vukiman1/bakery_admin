const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: Number,
  image: String,
  username: String,
  password: String,
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
