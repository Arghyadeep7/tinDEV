
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
  _id: String,
  hackArr: [hackSchema]
});

const Collab = mongoose.model("Collab", collabSchema);

module.exports = Collab;
