// import { Schema, Mongoose } from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imgName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
