
const mongoose = require("mongoose");

const hackSchema = new mongoose.Schema({
    hackId: String,
    owner: String,
    ownerId: String,
    name: String,
    organiser: String,
    date: String,
});

const collabSchema = new mongoose.Schema({
  id: String,
  hackArr: [hackSchema]
});

const Collabs = mongoose.model("Collabs", collabSchema);

module.exports = Collabs;
