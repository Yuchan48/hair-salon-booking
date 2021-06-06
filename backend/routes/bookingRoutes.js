const express = require("express");
const router = express.Router();

const { getAvailableDate, getBookingData, deleteBooking, saveBooking} = require("../controllers/bookingControllers");

router.get("/", getAvailableDate);
router.post("/", saveBooking)