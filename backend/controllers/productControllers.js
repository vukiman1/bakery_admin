const mongoose = require("mongoose");
const ProductModel = require("../models/productModel");

function getProducts(req, res) {
  ProductModel.find()
    .then((product) => {
      return res.status(200).json({
        success: true,
        message: "Danh sách sản phẩm",
        Products: product,
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

function getProduct(req, res) {
  const { id } = req.params;

  ProductModel.findOne({ id: id })
    .then((product) => {
      return res.status(200).json({
        success: true,
        message: "Sản phẩm",
        Product: product,
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

function createProduct(req, res) {
  const product = new ProductModel({
    id: req.body.id,
    image: req.body.image,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  return product
    .save()
    .then((newProduct) => {
      return res.status(201).json({
        success: true,
        message: "New cause created successfully",
        Product: newProduct,
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

function updateProduct(req, res) {
  const update = {
    id: req.body.id,
    image: req.body.image,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  const { id } = req.params;
  const updateObject = req.body;
  ProductModel.findOneAndUpdate({ id: id }, update)
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

function deleteProduct(req, res) {
  const { id } = req.params;

  ProductModel.deleteOne({ id: id })
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
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
