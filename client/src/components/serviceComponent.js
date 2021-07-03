import "./serviceComponent.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import hairset from "../product_image/hair-set.jpg";
import haircolor from "../product_image/colorhair.jpg";
import haircut from "../product_image/hairsalon.jpg";
import makeup from "../product_image/makeup.jpg";
import { selectServiceBooking } from "../redux/actions/bookingActions";

function ServiceComponent(props) {
  const bookingInfo = useSelector((state) => state.bookingInfo);
  const { service } = bookingInfo;

  let services = [
    ["Hair Cut", haircut],
    ["Color", haircolor],
    ["Styling", hairset],
    ["Make-up", makeup],
  ];

  //const [photoSelection, setPhotoSelection] = useState(services.map(ele => ele[0] === service));
  //const [serviceSelection, setServiceSelection] = useState(service)
  const dispatch = useDispatch();

  const selectServiceHandler = (ele) => {
    dispatch(selectServiceBooking(ele));
  };

  return (
    <div className="service-comp-container">
      <UncontrolledDropdown size="lg" className="service-dropdown">
        <DropdownToggle color="danger">
          {service ? service[0] : "Select our service"}
        </DropdownToggle>
        <DropdownMenu
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: (data) => {
                return {
                  ...data,
                  styles: {
                    ...data.styles,
                    overflow: "auto",
                    maxHeight: "250px",
                  },
                };
              },
            },
          }}
        >
          {services.map((ele) => {
            return (
              <DropdownItem
                key={ele[0]}
                className="service-dropdown-item"
                onClick={() => {
                  selectServiceHandler(ele);
                }}
                style={{
                  display: "flex",
                  height: "80px",
                  alignItems: "center",
                }}
              >
                <img src={ele[1]} alt="img" className="service-imgs" />
                <p style={{ fontSize: "20px" }}>{ele[0]}</p>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>

      <div>
        {service ? (
          <img className="picked-img-service" src={service[1]} alt="img" />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default ServiceComponent;
