const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createdUser,
  updateUser,
  deletedUser,
} = require("../controllers/userControllers");

router.get("/users", getUsers); // lấy tất cả người dùng hiện có trong csdl
router.get("/users/:id", getUser); // tìm người dùng theo id
router.post("/users", createdUser); // thêm người dùng
router.put("/users/:id", updateUser); //update thông tin người dùng
router.delete("/users/:id", deletedUser); //xoá người dùng

module.exports = router;
