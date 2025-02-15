const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/Account/user");

router.post("/", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        await User.collection.findOne({ email }, (err, result) => {
            if (err) {
                return res.json({
                    code: 400,
                    success: false,
                    message: "ERROR OCCURRED-" + err.message,
                });
            } else if (result === null) {
                return res.json({
                    code: 404,
                    success: false,
                    message: "USER NOT FOUND",
                });
            }

            if (bcrypt.compareSync(password, result.password) === true) {
                return res.json({
                    code: 200,
                    success: true,
                    message: "USER FOUND",
                    user: result,
                });
            } else {
                return res.json({
                    code: 404,
                    success: false,
                    message: "INVALID CREDENTIALS",
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
