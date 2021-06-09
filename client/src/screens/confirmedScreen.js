import "./confirmedScreen.css";
import { useParams } from "react-router-dom";
import { Jumbotron, Button } from "reactstrap";

import HomebtmImg from "../product_image/hair-set.jpg";

function ConfirmedScreen() {
  let { dateSelection, selectedtime } = useParams();

  return (
    <div className="confirmed-screen">
      <div className="confirmed-top">
        <Jumbotron className="confirmed-jumbo">
          <h1 className="display-1 text-white">Hair Salon</h1>
          <Button href="/booking/" className="confirmed-btn" color="danger">
            Book Now
          </Button>
        </Jumbotron>
      </div>
      <div className="confirmed-bottom">
        <div className="confirmed-bottom-left">
          <h2>Thank you for booking!</h2>
          <p>your booking is at</p>
          <h4>
            {selectedtime} &nbsp; {dateSelection}
          </h4>
        </div>
        <div className="confirmed-bottom-right">
          <img src={HomebtmImg} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmedScreen;
