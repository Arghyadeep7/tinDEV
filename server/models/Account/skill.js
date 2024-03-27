
const mongoose = require("mongoose");

const arrSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    rating: Number,
});

const skillSchema = new mongoose.Schema({
  _id: String,
  arr: [arrSchema]
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
