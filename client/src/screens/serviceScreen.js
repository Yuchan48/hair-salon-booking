import "./serviceScreen.css";
import {
  Jumbotron,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

import hairset from "../product_image/hair-set.jpg";
import haircolor from "../product_image/colorhair.jpg";
import haircut from "../product_image/hairsalon.jpg";
import makeup from "../product_image/makeup.jpg";

function ServiceScreen() {
  return (
    <div className="service-container">
      <div className="service-top">
        <Jumbotron className="service-jumbo">
          <h1>Hair Salon</h1>
          <Button href="/booking/" className="service-btn" color="danger">
            Book Now
          </Button>
        </Jumbotron>
      </div>

      <div className="service-bottom">
        <Container
          className="themed-container item-container-service"
          fluid={true}
        >
          <Row>
            <Col>
              <h3>Our Services</h3>
            </Col>
          </Row>
          <Row>
            <Col lg="3" md="6" sm="12">
              <Card className="service-cards">
                <CardImg
                  top
                  width="100%"
                  height="50%"
                  src={haircut}
                  alt="hair set img"
                />
                <CardBody>
                  <CardTitle tag="h5">Hair Cut</CardTitle>
                  <CardText>
                    A classic haircut tailored for women or men including a
                    luxury shampoo, and blowout. Starts from $175.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="12">
              <Card className="service-cards">
                <CardImg top width="100%" src={haircolor} alt="hair set img" />
                <CardBody>
                  <CardTitle tag="h5">Color</CardTitle>
                  <CardText>
                    Treat your hair to an all-over color process to enhance and
                    refine your color from roots to ends. Starts from $150.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="12">
              <Card className="service-cards">
                <CardImg top width="100%" src={hairset} alt="hair set img" />
                <CardBody>
                  <CardTitle tag="h5">Styling</CardTitle>
                  <CardText>
                    Pamper your hair with a shampoo + condition, followed by a
                    brush blowout for a flawlessly smooth and voluminous style.
                    Starts from $75.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="12">
              <Card className="service-cards">
                <CardImg top width="100%" src={makeup} alt="hair set img" />
                <CardBody>
                  <CardTitle tag="h5">Make-up</CardTitle>
                  <CardText>
                    Natural, sexy or dramatic, we'll create the perfect look for
                    you. We take a personalized approach to create your perfect
                    look. Starts from $85.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ServiceScreen;
