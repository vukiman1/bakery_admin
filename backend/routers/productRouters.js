const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

router.get("/products", getProducts); // lấy tất cả sản phẩm
router.get("/products/:id", getProduct); // lấy sản phẩm theo id
router.post("/products", createProduct); // thêm sản phẩm
router.put("/products/:id", updateProduct); //update sản phẩm
router.delete("/products/:id", deleteProduct); //xoá sản phẩm

module.exports = router;
