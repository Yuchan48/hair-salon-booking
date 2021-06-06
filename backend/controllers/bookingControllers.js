const Booking = require("../models/booking");

const getAvailableDate = async (req, res) => {
    try {
        const booking = await Booking.find({selectedDate: req.params.selectedDate});
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error"});
    }
}

const getBookingData = async (req, res) => {
    try {
        const booking = await Booking.find({firstName: req.query.firstName, lastName: req.query.lastName, email: req.query.email});
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error"});
    }
}

const deleteBooking = (req, res) => {
    Booking.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            console.log("deleted");
            res.json({message: "deleted"});
          } else {
            console.log("error deleting the booking : " + err);
          }
    });    
}

const saveBooking = (req, res) => {
  const { selectedDate, selectedTime, firstName, lastName, phone, email } = req.body;
  let booking = new Booking({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    selectedDate: selectedDate,
    selectedTime: selectedTime
  });

  booking.save((err, doc) => {
    if (!err) {
        res.json({message: "booked"});
    } else {
      
      console.log("Error during sending data : " + err);
    }
  });
}

module.exports = {
    getAvailableDate,
    getBookingData,
    deleteBooking,
    saveBooking
}