
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
  id: String,
  hackArr: [hackSchema]
});

const Interests = mongoose.model("Interests", interestSchema);

module.exports = Interests;
