import "./homeScreen.css";
import { Jumbotron, Button } from 'reactstrap';
import HomebtmImg from '../product_image/hair-set.jpg';

function HomeScreen() {
  return (
    <div className="home-container">
      <div className="top">
         
         <Jumbotron className="jumbo">
           <h1 className="display-1 text-white">Hair Salon</h1>
           <Button href="/booking/" color="danger">Book Now</Button>
         </Jumbotron>
      </div>
      <br />

      <div className="bottom">
          <div className="bottom-left">
              <div className="description">
                <h3>Who We Are</h3>
                <p>Hair Salon offers a perfect experience in achieving beautifully cut and colored hair. Our talented team of experts will create a personalized look to suit your individuality, features and hair texture with perfectly blended colors to complement your skin tone.</p>
              
                <h3>Opening Hour</h3>
                <p>Mon-Fri 10:00 - 18:00</p>
              
                <h3>Location</h3>
                <p>Alexander Str 15 12345 Berlin germany</p>
              </div>
          </div>

          <div className="bottom-right">
              <img src={HomebtmImg} alt="img" />
          </div>
      </div>
    </div>
  );
}

export default HomeScreen;
