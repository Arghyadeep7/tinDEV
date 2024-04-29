const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Hackathon = require("../models/hackathon");

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

router.post("/:_id", async (req, res, next) => {
    try {
        const _id = new ObjectId(req.params._id);
        const data = req.body;
        
        delete data._id;
        delete data.code;
        delete data.success;
        delete data.message;

        // console.log(data);

        await Hackathon.collection.replaceOne({ _id }, data, (err, result) => {
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
                    message: "HACKATHON UPDATED",
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
