# Hair Salon Booking

Booking website created with React, Node.js, Redux, and MongoDB.

___

#### Home screen

![home](https://i.imgur.com/lZZWKBxm.jpg)

#### preview : https://yuchan-salon-booking.herokuapp.com/
___

- Secure sign-in with Authentication with jasonwebtoken
- Password hashed with bcrypt
- Sign in info will remain for 30days in the local storage
- You will receive a booking confirmation by email
- When signed in, you can view and delete your existing booking, or update/delete your account
- When signed in as an admin, you can view and delete lists of all the users and bookings 
- You can make a booking from Monday - Friday for the next 2 weeks

___

#### set up
- `npm init -y` in the root directory
- Install all the dependencies in both the client and root folder
- create .env file and add the environment values. `MONGO_URI={MongoDB URI}` , `PORT=5000` . `EMAIL_ADDRESS={your gmail address}` and `EMAIL_SECRET={your gmail password}`.
- to run the app, type `npm run dev` in the terminal






