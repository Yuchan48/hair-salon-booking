import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//screens
import HomeScreen from './screens/homeScreen';
import ServiceScreen from './screens/serviceScreen';
import ConfirmedScreen from './screens/serviceScreen';
import BookingScreen from './screens/bookingScreen';

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
            <Route exact path="/confirmed" component={ConfirmedScreen} />
             {/* booked info */}
          </Switch>
          
     
        </main>
       

      
    
      </Router>
      
  );
}

export default App;
