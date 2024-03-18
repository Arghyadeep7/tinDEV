const mongoose = require("mongoose");

const hackSchema = new mongoose.Schema({
  owner: String,
  name: String,
  organiser: String,
  date: String,
  about: String,
  count: Number,
  cost: Number,
  repo: String,
  deployed: String,
  mustTech: [
    {
      id: Number,
      name: String,
      rating: Number,
    },
  ],
  prefTech: [
    {
      id: Number,
      name: String,
      rating: Number,
    },
  ],
  clgPref: [
    {
      id: Number,
      name: String,
    },
  ],
  links: [
    {
      id: Number,
      url: String,
    },
  ],
  members: [
    {
      id: String,
      fname: String,
      lname: String,
      email: String,
      college: String,
    },
  ],
});

const Hackathons = mongoose.model("Hackathons", hackSchema);

module.exports = Hackathons;
