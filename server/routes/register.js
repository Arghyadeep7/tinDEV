const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/Account/user");
const Education = require("../models/Account/education");
const Experience = require("../models/Account/experience");
const Project = require("../models/Account/project");
const Skill = require("../models/Account/skill");
const Certificate = require("../models/Account/certificate");
const Link = require("../models/Account/link");

const Interest = require("../models/interest");
const Collab = require("../models/collab");

router.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const _id = new ObjectId();        

        await User.collection.findOne(
            { email: data.email },
            async (err, user) => {
                if (err) {
                    return res.json({
                        code: 500,
                        success: false,
                        message: "ERROR OCCURRED-" + err.message,
                    });
                } else if (user !== null) {
                    return res.json({
                        code: 400,
                        success: false,
                        message: "EMAIL EXISTS",
                    });
                }           

                data.password = bcrypt.hashSync(data.password, 10);                                              

                await new User({
                    _id,
                    ...data,                    
                }).save();

                await new Education({
                    _id,
                    arr: [],
                }).save();

                await new Experience({
                    _id,
                    arr: [],
                }).save();

                await new Project({
                    _id,
                    arr: [],
                }).save();

                await new Skill({
                    _id,
                    arr: [],
                }).save();

                await new Certificate({
                    _id,
                    arr: [],
                }).save();

                await new Link({
                    _id,
                    arr: [],
                }).save();

                await new Interest({
                    _id,
                    hackArr: {
                        sent: [],
                        received: [],
                    },
                }).save();

                await new Collab({
                    _id,
                    hackArr: [],
                }).save();

                return res.json({
                    _id,
                    code: 200,
                    success: true,
                    message: "REGISTRATION SUCCESSFULL",
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
