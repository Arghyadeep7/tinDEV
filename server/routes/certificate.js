const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Certificate = require("../models/Account/certificate");

router.get("/:_id", async (req, res, next) => {
  try {
    const _id = req.params._id;

    await Certificate.collection.findOne({ _id }, (err, result) => {
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

    const arr = req.body;    

    const _id = req.params._id;

    await Certificate.collection.replaceOne({ _id }, {_id, arr}, (err, result) => {
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
