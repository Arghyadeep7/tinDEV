const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Hackathon = require("../models/hackathons");

router.get("/:_id", async (req, res, next) => {
  try {
    
    const _id = new ObjectId(req.params._id);

    await Hackathon.collection.findOne({ _id }, (err, hack) => {
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
          message: "HACKATHON FOUND",
          data: hack
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

    const response = await new Hackathon({
        ...data,
        members: [],
    }).save();

    return res.json({
        code: 200,
        success: true,
        message: "HACKATHON SUCCESSFULLY CREATED",
        _id: response._id,
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
