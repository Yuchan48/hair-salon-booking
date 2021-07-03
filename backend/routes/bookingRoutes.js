require("dotenv").config();
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const Booking = require("../models/BookingModel");
const { isAuth, isAdmin, bookingEmailTemplate } = require("../utils");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_SECRET,
  },
});

router.post("/", isAuth, async (req, res) => {
  try {
    const { selectedDate, selectedTime, firstName, lastName, service } =
      req.body;
    const booking = new Booking({
      firstName: firstName,
      lastName: lastName,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      service: service,
      user: req.user._id,
    });

    const savedBooking = await booking.save();

    let mailOption = {
      from: `${process.env.email_address}`,
      to: `${req.user.email}`,
      subject: `Booking ID: ${booking._id}`,
      html: bookingEmailTemplate(booking),
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("message sent: ", info.response);
      }
    });

    res.send({ message: "booking saved", booking: savedBooking });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ message: "Couldn't save booking" });
  }
});

router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    res.status(500).send({ message: "mongodb server error" });
  }
});

router.get("/availability/:date", async (req, res) => {
  try {
    const times = await Booking.find({ selectedDate: req.params.date });
    res.send(times);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Couldn't find times" });
  }
});

router.get("/confirmed/:id", isAuth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.send(booking);
  } catch (error) {
    res.status(500).json({ message: "No booking found" });
  }
});

router.get("/user/list", isAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.send(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking not found" });
  }
});

router.delete("/:id/delete", isAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    res.send({ message: "Booking delete success", booking: booking });
  } catch (error) {
    res.status(500).send({ message: "Booking not found" });
  }
});

module.exports = router;
