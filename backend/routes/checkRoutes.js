let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

const Booking = require("../models/booking");

router.post("/", async (req, res, next) => {
  try {
    const booking = await Booking.find({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error finding booking" });
  }
});

module.exports = router;
