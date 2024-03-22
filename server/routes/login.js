const express = require("express");
const router = express.Router();

const User = require("../models/users");

router.post("/", async (req, res, next) => {
  try {
    
    const { email, password } = req.body;

    await User.collection.findOne({ email, password }, (err, user) => {
      if (err) {
        return res.json({
          code: 400,
          success: false,
          message: "ERROR OCCURRED-" + err.message,
        });
      } else if (user === null) {
        return res.json({
          code: 404,
          success: false,
          message: "USER NOT FOUND",
        });
      }
      return res.json({
        code: 200,
        success: true,
        message: "USER FOUND",
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
