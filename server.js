const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Item = require("./route/items");
const fs = require("fs");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose database connection established succesfully");
});

const usersRouter = require("./route/users");
const itemRouter = require("./route/items");
const cartRouter = require("./route/carts");

app.use("/users", usersRouter);
app.use("/items", itemRouter);
app.use("/carts", cartRouter);

app.use("/uploads", express.static("uploads"));

app.delete("/uploads/:id", (req, res) => {
  const path = "./uploads/" + req.params.id;
  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
