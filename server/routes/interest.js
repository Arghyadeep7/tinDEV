const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Interest = require("../models/interest");
const Hackathon = require("../models/hackathon");
const Collab = require("../models/collab");

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
            ...result,
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

router.post("/:_id/accept", async (req, res, next) => {
  try {
    const _id = req.params._id;
    const data = req.body;

    const memberId = data.memberId;
    const ownerId = data.ownerId;

    let response = {};

    await Hackathon.collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $push: {
          members: {
            _id: memberId,
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            college: data.college,
          },
        },
        $inc: {
          count: -1,
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
          response = {
            hackCode: 200,
            hackSuccess: true,
            hackMessage: "HACKATHON UPDATED",
          };
        }
      }
    );

    await Collab.collection.updateOne(
      { _id: memberId },
      {
        $push: {
          hackArr: {
            $each: [
              {
                _id: _id.toString(),
                name: data.name,
                organiser: data.organiser,
                owner: data.owner,
                ownerId: ownerId,
                date: data.date,
              },
            ],
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
          response = {
            ...response,
            collabCode: 200,
            collabSuccess: true,
            collabMessage: "COLLAB ACCEPTED",
          };
        }
      }
    );

    await Interest.collection.updateOne(
      { _id: ownerId },
      {
        $pull: {
          hackArr: {
            _id: memberId,
            hackId: _id,
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
            ...response,
            interestCode: 200,
            interestSuccess: true,
            interestMessage: "INTEREST ACCEPTED",
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
