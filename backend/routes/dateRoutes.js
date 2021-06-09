let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

const Booking = require("../models/booking");

router.post("/", async (req, res, next) => {  
        try {
            const booking = await Booking.find({selectedDate: req.body.selectedDate});
            res.json(booking);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "error finding times"});
        }
    
});

module.exports = router;