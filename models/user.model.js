// import { Schema, Mongoose } from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    datebirth: {
      type: Date,
    },
    sex: {
      type: Boolean,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
