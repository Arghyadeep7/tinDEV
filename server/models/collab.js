
const mongoose = require("mongoose");

const collabSchema = new mongoose.Schema({
  _id: String,
  hackArr: [String]
});

const Collab = mongoose.model("Collab", collabSchema);

module.exports = Collab;
