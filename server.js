const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");

const connectDB = require("./backend/models/config");

connectDB();

app.use(cors());
app.use(express.json());

//routes
//app.use("/api/availability", require("./backend/routes/dateRoutes"));
//app.use("/api/save", require("./backend/routes/saveRoutes"));
//app.use("/api/check", require("./backend/routes/checkRoutes"));
//app.use("/api/delete", require("./backend/routes/deleteRoutes"));
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
