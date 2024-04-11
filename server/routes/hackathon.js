const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Hackathon = require("../models/hackathon");
const Collab = require("../models/collab");

router.get("/:_id", async (req, res, next) => {
  try{

    const ownerId = req.params._id;

    console.log(ownerId, "here");

    await Hackathon.collection.find({ ownerId }, (err, result) => {
      if (err) {
        return res.json({
          code: 500,
          success: false,
          message: "ERROR OCCURRED-" + err.message,
        });
      } else {

        console.log(result);
        return res.json({
          code: 200,
          success: true,
          message: "HACKATHON FOUND",
          arr: result,
        });
      }
    });
  }catch (err) {
    return res.json({
      code: 500,
      success: false,
      message: "ERROR OCCURRED-" + err.message,
    });
  }
});

router.get("/hack/:_id", async (req, res, next) => {
  try {
    const _id = req.params._id;

    await Hackathon.collection.findOne({ _id }, (err, result) => {
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
    const _id = new ObjectId();

    const response = await new Hackathon({
      _id,
      ...data,      
    }).save();

    const hackId = response._id.toString();
    const ownerId = req.params._id;

    await Collab.collection.updateOne(
      { _id: ownerId },
      {
        $push: {
          hackArr: {
            $position: 0,
            $each: [
              {
                _id: hackId,
                name: data.name,
                organiser: data.organiser,
                owner: data.owner,
                ownerId: ownerId,
                date: data.date,
              },
            ],
          },
        },
      },
      (err, result) => {
        return res.json({
          code: result === null ? 400 : 200,
          success: true,
          hackId: hackId,
          hackMessage: "HACKATHON SUCCESSFULLY CREATED",
          ownerId: _id,
          userMessage:
            result === null
              ? "OWNER NOT UPDATED"
              : "OWNER SUCCESSFULLY UPDATED",
          ...result,
        });
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
