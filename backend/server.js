const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");

const connectDB = require("./models/config");

connectDB();

app.use(cors());
app.use(express.json());



//routes
app.use("/api/availability", require("./routes/dateRoutes"));
app.use("/api/save", require("./routes/saveRoutes"));
app.use("/api/check", require("./routes/checkRoutes"));
app.use("/api/delete", require("./routes/deleteRoutes"));

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "build", "index.html"))
    });
} else {
    app.get("/", (req, res) => {
        res.json({ message: "API running..." });
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))