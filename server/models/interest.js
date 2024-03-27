
const mongoose = require("mongoose");

const hackSchema = new mongoose.Schema({
    _id: String,
    fname: String,
    lname: String,
    email: String,
    college: String,
    hackId: String,
    name: String,
    organiser: String,
    date: String,
});

const interestSchema = new mongoose.Schema({
  _id: String,
  hackArr: {
    sent: [hackSchema],
    received: [hackSchema],
  }
});

const Interest = mongoose.model("Interest", interestSchema);

module.exports = Interest;
