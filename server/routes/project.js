const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Project = require("../models/Account/project");

router.get("/:_id", async (req, res, next) => {
  try {
    const _id = req.params._id;

    await Project.collection.findOne({ _id }, (err, user) => {
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
          ...user,
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

    await Project.collection.replaceOne({ _id }, data, (err, result) => {
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
