
const mongoose = require("mongoose");

const arrSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    about: String,
    tech: String,
    repo: String,
    deployed: String,
});

const projectSchema = new mongoose.Schema({
  _id: String,
  arr: [arrSchema]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
