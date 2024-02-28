//đặt các giá trị
require("dotenv").config();

const PORT = process.env.PORT || 4444;
const connectionString = process.env.MDB_CONNECTION_STRING;

//kết nối đến csdl
const connectDB = require("./config/db.js");

//import
const express = require("express");
const UserModel = require("./models/userModel.js");
const productRouters = require("./routers/productRouters.js");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// kết nối csdl
connectDB.connectDB(connectionString);

//products roter
app.use("/bakery", productRouters);

//users
app.get("/users", async (req, res) => {
  UserModel.find({}).then((user) => {
    res.status(200).json(user);
  });
});
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  UserModel.findOne({ id: id }).then((user) => {
    res.status(200).json(user);
  });
});

app.use(cors());
app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
