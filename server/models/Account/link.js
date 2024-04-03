
const mongoose = require("mongoose");

const arrSchema = new mongoose.Schema({
    _id: Number,
    url: String,    
});

const linkSchema = new mongoose.Schema({
  _id: String,
  arr: [arrSchema]
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
