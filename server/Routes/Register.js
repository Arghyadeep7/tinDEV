const express = require("express");
const router = express.Router();

const User = require("../models/users");
const Interest = require("../models/interests");
const Collab = require("../models/collabs");

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    console.log(req.body);

    User.collection.findOne({ email: data.email }, async (err, user) => {
      if (err) {
        return res.json({
          code: 400,
          success: false,
          message: "ERROR OCCURRED-" + err.message,
        });
      } else if (user !== null) {
        return res.json({ code: 400, success: false, message: "EMAIL EXISTS" });
      }

      const response = await new User({
        ...data,
        education: [],
        work: [],
        projects: [],
        skills: [],
        certifications: [],
        links: [],
        hackathons: [],
      }).save();

      const id = response._id;

      new Interest({
        _id: id,
        hackArr: [],
      }).save();

      new Collab({
        _id: id,
        hackArr: [],
      }).save();

      next();
      return res.json({
        code: 200,
        success: true,
        message: "REGISTRATION SUCCESSFULL",
        id: id,
      });
    });
  } catch (err) {
    return res.json({
      code: 400,
      success: false,
      message: "ERROR OCCURRED-" + err.message,
    });
  }
});

module.exports = router;
