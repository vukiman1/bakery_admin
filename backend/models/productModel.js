const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  id: Number,
  image: String,
  name: String,
  price: Number,
  quantity: Number,
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
