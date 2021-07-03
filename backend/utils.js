require("dotenv").config();
let jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_KEY || "secretkey",
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_KEY || "secretkey", (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Invalid Admin Token" });
  }
};

const bookingEmailTemplate = (booking) => {
  const now = new Date().toString().substring(0, 21);
  return `
  <h1>Booking Confirmation</h1>
  <h4>Booking ID: ${booking._id}</h4>
  <p style="font-size:15px;">Booking created on: ${now}</p>
  <hr>
  <h3>Dear ${booking.firstName} ${booking.lastName}</h3>
  <p style="font-size:16px;">
  Your booking is on</p>
  <p style="font-size:18px; color: red;">${booking.selectedDate}  ${booking.selectedTime}</p> 
  <br>
  <p style="font-size:15px;">Thank you for booking with us.</p>
  <p style="font-size:15px;"><strong>Hair Salon</strong></p>
 
  `;
};

module.exports = { generateToken, isAuth, isAdmin, bookingEmailTemplate };
