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
        const { _id, senderId, receiverId } = req.body;        

        await Interest.collection.updateOne(
            { _id: senderId },
            {
                $push: {
                    "hackArr.sent": {
                        $each: [{_id: receiverId, hackId: _id}],
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
                }
            }
        );

        await Interest.collection.updateOne(
            { _id: receiverId },
            {
                $push: {
                    "hackArr.received": {
                        $each: [{_id: senderId, hackId: _id}],
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

        const { senderId, receiverId } = data.receiverId;
        
        var response = {};

        await Hackathon.collection.updateOne(
            { _id: new ObjectId(_id) },
            {
                $push: {
                    members: {
                        _id: receiverId,
                        fname: data.fname,
                        lname: data.lname,
                        email: data.email,
                        college: data.college,
                    },
                },
                $inc: {
                    memberCount: -1,
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
            { _id: receiverId },
            {
                $push: {
                    hackArr: {
                        $each: [
                            _id
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
            { _id: senderId },
            {
                $pull: {
                    "hackArr.sent": {
                        _id: senderId,
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

        await Interest.collection.updateOne(
            { _id: receiverId },
            {
                $pull: {
                    "hackArr.received": {
                        _id: senderId,
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
