
const mongoose = require("mongoose");

const hackSchema = new mongoose.Schema({
    memberId: String,
    fname: String,
    lname: String,
    email: String,
    college: String,
    hackId: String,
});

const interestSchema = new mongoose.Schema({
  _id: String,
  hackArr: [hackSchema]
});

const Interest = mongoose.model("Interest", interestSchema);

module.exports = Interest;
