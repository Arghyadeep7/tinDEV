const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Hackathon = require("../models/hackathons");
const Collab = require("../models/collabs");

router.get("/:_id", async (req, res, next) => {
  try {
    const _id = new ObjectId(req.params._id);

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

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    const response = await new Hackathon({
      ...data,
      members: [],
    }).save();

    const hackId = response._id.toString();
    const _id = data.ownerId;

    await Collab.collection.updateOne(
      { _id },
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
                ownerId: _id,
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
