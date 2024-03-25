const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  dob: String,
  gender: String,
  nationality: String,
  address: String,
  pinCode: Number,
  college: String,
  university: String,
  roll: String,
  course: String,
  ctype: String,
  specialisation: String,
  duration: Number,
  grad: Number,
  cstatus: String,
  education: [
    {
      id: Number,
      institute: String,
      course: String,
      specialisation: String,
      from: Number,
      to: Number,
      grad: String,
    },
  ],
  work: [
    {
      id: Number,
      firm: String,
      position: String,
      from: Number,
      to: Number,
    },
  ],
  projects: [
    {
      id: Number,
      name: String,
      about: String,
      tech: String,
      repo: String,
      deployed: String,
    },
  ],
  skills: [
    {
      id: String,
      org: String,
      rating: Number,
    },
  ],
  certifications: [
    {
      id: Number,
      org: String,
      name: String,
      issued: String,
      expiry: String,
      link: String,
    },
  ],
  links: [
    {
      id: Number,
      url: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;