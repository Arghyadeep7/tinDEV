const express = require("express");
const router = express.Router();

const User = require("../models1/Users");

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    User.collection.updateOne({ email: data.email }, data, (err, user) => {
      if (err) {
        return res.json({
          code: 400,
          success: false,
          message: "ERROR OCCURRED-" + err.message,
        });
      } else {
        return res.json({
          code: 200,
          success: true,
          message: "UPDATION SUCCESSFULL",
          id: user._id,
        });
      }
    });

    // const response = await new User({
    //   ...data,
    //   education: [],
    //   work: [],
    //   projects: [],
    //   skills: [],
    //   certifications: [],
    //   links: [],
    //   hackathons: [],
    // }).save();

    // const id = response._id.toString();

    // next();
    // return res.json({
    //   code: 200,
    //   success: true,
    //   message: "UPDATION SUCCESSFULL",
    //   id: id,
    // });
  } catch (err) {
    return res.json({
      code: 400,
      success: false,
      message: "ERROR OCCURRED-" + err.message,
    });
  }
});

module.exports = router;
