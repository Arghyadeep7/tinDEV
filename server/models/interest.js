
const mongoose = require("mongoose");

const hackSchema = new mongoose.Schema({
    _id: String,    
    hackId: String,    
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
