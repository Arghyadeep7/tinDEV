const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const Skill = require("../models/Account/skill");

router.get("/:_id", async (req, res) => {
    try{        
        const _id = req.params._id;

        const result = await Skill.find({});
        res.status(200).json({
            _id,
            code: 200,
            success: true,
            arr: result
        });
    }catch(err){
        res.status(500).json({
            code: 500,
            success: false,
            message: "ERROR OCCURRED-" + err.message,
        });
    }
});

module.exports = router;