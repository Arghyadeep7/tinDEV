const mongoose = require("mongoose");

const arrSchema = new mongoose.Schema({
    _id: Number,
    org: String,
    name: String,
    issued: String,
    expiry: String,
    link: String,
});

const certificateSchema = new mongoose.Schema({
  _id: String,
  arr: [arrSchema],
});

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;
