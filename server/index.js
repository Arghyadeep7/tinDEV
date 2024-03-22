require("dotenv").config();

require("./db/connection");

const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "http://localhost:3000/"
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