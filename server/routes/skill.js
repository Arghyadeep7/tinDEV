const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Skill = require("../models/Account/skill");

router.get("/:_id", async (req, res, next) => {
  try {
    const _id = req.params._id;

    await Skill.collection.findOne({ _id }, (err, result) => {
      if (err) {
        return res.json({
          code: 500,
          success: false,
          message: "ERROR OCCURRED-" + err.message,
        });
      } else {
        return res.json({
          code: 200,
          success: true,
          message: "USER FOUND",
          ...result,
        });
      }
    });
  } catch (err) {
    return res.json({
      code: 500,
      success: false,
      message: "ERROR OCCURRED-" + err.message,
    });
  }
});

router.post("/:_id", async (req, res, next) => {
  try {

    const data = req.body;
    const _id = req.params._id;

    await Skill.collection.replaceOne({ _id }, data, (err, result) => {
      if (err) {
        return res.json({
          code: 500,
          success: false,
          message: "ERROR OCCURRED-" + err.message,
        });
      } else {
        return res.json({
          code: 200,
          success: true,
          message: "UPDATION SUCCESSFULL",
          ...result,
        });
      }
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
