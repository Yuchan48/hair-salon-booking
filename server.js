const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");

const connectDB = require("./backend/models/config");

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/booking", require("./backend/routes/bookingRoutes"));
app.use("/api/users", require("./backend/routes/userRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server connected on port ${PORT}`));
