const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  fname: String,
  lname: String,
  email: String,
  password: String,
  dob: String,
  gender: String,
  country: String,
  address: String,
  pinCode: Number,
  college: String,
  university: String,
  roll: String,
  course: String,
  type: String,
  specialisation: String,
  duration: Number,
  grad: Number,
  status: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;