const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "This field is required.",
  },
  lastName: {
    type: String,
    required: "This field is required.",
  },
  email: {
    type: String,
    required: "This field is required.",
  },
  selectedDate: {
    type: String,
    required: "This field is required.",
  },
  selectedTime: {
    type: String,
    required: "This field is required.",
  },
  service: {
    type: String,
    required: "This field is required",
  },
  dateTimeArr: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
