const mongoose = require("mongoose");
// "mongodb://127.0.0.1:27017/bakery"
function connectDB(dbName) {
  mongoose
    .connect(dbName)
    .then(() => {
      console.log("Kết nối thành công đến cơ sở dữ liệu!");
    })
    .catch((error) => {
      console.log("Lỗi kết nối đến cơ sở dữ liệu");
    });
}

module.exports = { connectDB };
