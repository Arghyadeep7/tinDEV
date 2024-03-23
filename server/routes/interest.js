const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Interest = require("../models/interests");

router.get("/:_id", async (req, res, next) => {
  try {
    const _id = req.params._id;

    await Interest.collection.findOne({ _id }, (err, result) => {
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
          message: "INTERESTS FOUND",
          data: result,
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
    const _id = req.params._id;
    const data = req.body;

    await Interest.collection.updateOne(
      { _id },
      {
        $push: {
          hackArr: {
            $each: [data],
            $position: 0,
          },
        },
      },
      (err, result) => {
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
            message: "INTEREST SENT",
            data: result,
          });
        }
      }
    );
  } catch (err) {
    return res.json({
      code: 500,
      success: false,
      message: "ERROR OCCURRED-" + err.message,
    });
  }
});

// router.post("/accept", async (req, res, next) => {
//   try {
//     const _id = req.body._id;
//   } catch (err) {
//     return res.json({
//       code: 500,
//       success: false,
//       message: "ERROR OCCURRED-" + err.message,
//     });
//   }
// });

module.exports = router;
