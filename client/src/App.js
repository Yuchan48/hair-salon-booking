import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";


//screens
import HomeScreen from './screens/homeScreen';
import ServiceScreen from './screens/serviceScreen';
import ConfirmedScreen from './screens/confirmedScreen';
import BookingScreen from './screens/bookingScreen';
import CheckScreen from './screens/checkScreen';

//components
import NavbarSection from './components/navbar';

function App() {

  return (
      <Router>
         {/* navbar*/}
      {/* navlink / hamburger */}
        <main>
          <NavbarSection />
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route  exact path="/service" component={ServiceScreen} />
            <Route exact path="/booking" component={BookingScreen} />
            <Route exact path="/confirmed/:dateSelection/:selectedtime/" component={ConfirmedScreen} />
            <Route exact path="/check" component={CheckScreen} />

          </Switch>
          
     
        </main>
       

      
    
      </Router>
      
  );
}

export default App;
