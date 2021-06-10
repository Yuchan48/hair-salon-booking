let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

const Booking = require("../models/booking");

router.get("/:id", (req, res) => {
  Booking.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      console.log("deleted");
      res.json({ message: "deleted" });
    } else {
      console.log("error deleting the booking : " + err);
    }
  });
});

module.exports = router;
