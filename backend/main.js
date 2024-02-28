//đặt các giá trị
require("dotenv").config();
const PORT = process.env.PORT || 4444;
const connectionString = process.env.MDB_CONNECTION_STRING;

//import
const express = require("express");
const cors = require("cors");
const productRouters = require("./routers/productRouters.js");
const userRouters = require("./routers/userRouters.js");

const app = express();

app.use(express.json());
app.use(cors());

// kết nối csdl
const connectDB = require("./config/db.js");
connectDB.connectDB(connectionString);

////ROUTER
//products roter
app.use("/bakery", productRouters);
//users router
app.use("/bakery", userRouters);

// chạy cors để bỏ thông báo lỗi khi get api
app.use(cors());
app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
