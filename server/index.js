require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cors({
//   origin: "https://demo-y-classes.vercel.app"
//   })
// );

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
    console.log("Server listening on port -", PORT);
});