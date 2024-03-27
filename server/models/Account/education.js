
const mongoose = require("mongoose");

const arrSchema = new mongoose.Schema({
    _id: Number,
    institute: String,
    course: String,
    specialisation: String,
    from: Number,
    to: Number,
    grade: String,
});

const educationSchema = new mongoose.Schema({
  _id: String,
  arr: [arrSchema]
});

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
