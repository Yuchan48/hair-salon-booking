const express = require("express");
require("dotenv").config();
const app = express();

const connectDB = require("./models/config");

connectDB();


app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API running..." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))