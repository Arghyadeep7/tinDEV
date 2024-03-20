require("dotenv").config();

require("./db1/connection1");

const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors({
//   origin: "https://demo-y-classes.vercel.app"
//   })
// );

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server listening on port -", PORT);
});

const register = require("./routes1/register1");
app.use("/register", register);
