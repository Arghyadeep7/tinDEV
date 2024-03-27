
const mongoose = require("mongoose");

const arrSchema = new mongoose.Schema({
    _id: Number,
    firm: String,
    position: String,
    from: Number,
    to: Number,
});

const experienceSchema = new mongoose.Schema({
  _id: String,
  arr: [arrSchema]
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
