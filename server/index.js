require("dotenv").config();

require("./db/connection");

const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
    console.log("Server listening on port -", PORT);
});

const register = require("./routes/register");
app.use("/register", register);

const signin = require("./routes/signin");
app.use("/signin", signin);

const account = require("./routes/Account/account");
app.use("/account", account);

const education = require("./routes/Account/education");
app.use("/educations", education);

const experience = require("./routes/Account/experience");
app.use("/experiences", experience);

const project = require("./routes/Account/project");
app.use("/projects", project);

const skill = require("./routes/Account/skill");
app.use("/skills", skill);

const certificate = require("./routes/Account/certificate");
app.use("/certificates", certificate);

const link = require("./routes/Account/link");
app.use("/links", link);

const hackathon = require("./routes/hackathon");
app.use("/hackathons", hackathon);

const collab = require("./routes/collab");
app.use("/collabs", collab);

const interest = require("./routes/interest");
app.use("/interests", interest);
