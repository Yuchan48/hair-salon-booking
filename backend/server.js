const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const connectDB = require("./models/config");

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API running..." });
});

//routes
app.use("/api/availability", require("./routes/dateRoutes"));
app.use("/api/save", require("./routes/saveRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))