const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const router = express.Router();

const User = require("../models/users");
const Interest = require("../models/interests");
const Collab = require("../models/collabs");

router.post("/", async (req, res, next) => {
  try {
    
    const data = req.body;

    await User.collection.findOne({ email: data.email }, async (err, user) => {
      if (err) {
        return res.json({
          code: 500,
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

      // console.log(response._id);

      new Interest({
        _id: response._id,
        hackArr: [],
      }).save();

      new Collab({
        _id: response._id,
        hackArr: [],
      }).save();

      return res.json({
        code: 200,
        success: true,
        message: "REGISTRATION SUCCESSFULL",
        _id: response._id,
      });
    });

  } catch (err) {
    
    return res.json({
      code: 500,
      success: false,
      message: "ERROR OCCURRED-" + err.message,
    });

  }
});

module.exports = router;
