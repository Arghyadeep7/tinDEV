const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const User = require("../models/users");

router.get("/", async (req, res, next) => {
  try {
    
    const id = req.body._id;
    const _id = new ObjectId(id);

    await User.collection.findOne({ _id }, (err, user) => {
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
          data: user
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

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    await User.collection.replaceOne(
      { email: data.email },
      data,
      (err, user) => {
        if (err) {
          return res.json({
            code: 500,
            success: false,
            message: "ERROR OCCURRED-" + err.message,
          });
        } else {
          console.log(user);
          return res.json({
            code: 200,
            success: true,
            message: "UPDATION SUCCESSFULL",
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

module.exports = router;
