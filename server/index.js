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
    origin: "http://localhost:3000/",
  })
);

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server listening on port -", PORT);
});

const register = require("./routes/register");
app.use("/register", register);

const login = require("./routes/login");
app.use("/login", login);

const account = require("./routes/account");
app.use("/account", account);

const education = require("./routes/education");
app.use("/education", education);

const experience = require("./routes/experience");
app.use("/experience", experience);

const project = require("./routes/project");
app.use("/project", project);

const skill = require("./routes/skill");
app.use("/skill", skill);

const certificate = require("./routes/certificate");
app.use("/certificate", certificate);

const link = require("./routes/link");
app.use("/link", link);

const hackathon = require("./routes/hackathon");
app.use("/hackathon", hackathon);

const interest = require("./routes/interest");
app.use("/interest", interest);
