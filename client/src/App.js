import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";

//screens
import HomeScreen from "./screens/homeScreen";
import ServiceScreen from "./screens/serviceScreen";
import ConfirmedScreen from "./screens/confirmedScreen";
import BookingScreen from "./screens/bookingScreen";

//components
import NavbarSection from "./components/navbar";
import FooterSection from "./components/footerSection";
import SigninScreen from "./screens/signinScreen";
import RegisterScreen from "./screens/registerScreen";
import TopDrawer from "./components/TopDrawer";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import ProfileScreen from "./screens/profileScreen";
import BookingHistoryScreen from "./screens/bookingHistoryScreen";
import AllBookingScreen from "./screens/allBookingScreen";
import UsersListScreen from "./screens/usersListScreen";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <NavbarSection click={() => setSideToggle(!sideToggle)} />
      <TopDrawer show={sideToggle} click={() => setSideToggle(false)} />

      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/service" component={ServiceScreen} />
          <Route exact path="/booking" component={BookingScreen} />
          <Route exact path="/confirmed/:id" component={ConfirmedScreen} />
          <Route exact path="/signin" component={SigninScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <PrivateRoute exact path="/profile" component={ProfileScreen} />
          <PrivateRoute
            exact
            path="/bookinghistory"
            component={BookingHistoryScreen}
          />
          <AdminRoute exact path="/allbooking" component={AllBookingScreen} />
          <AdminRoute exact path="/userlist" component={UsersListScreen} />
        </Switch>
      </main>
      <FooterSection />
    </Router>
  );
}

export default App;
