let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

const Booking = require("../models/booking");

router.post("/", (req, res, next) => {
    const { selectedDate, selectedTime, firstName, lastName, email, service } = req.body;
    let booking = new Booking({
      firstName: firstName,
      lastName: lastName,
      email: email,
      selectedDate: selectedDate,
      selectedTime: selectedTime, 
      service: service
    });
  
    booking.save((err, doc) => {
      if (!err) {
          res.json({message: "booked"});
      } else {
        
        console.log("Error during sending data : " + err);
      }
    });
});

module.exports = router;
