import "./serviceComponent.css";
import React, { useState } from "react";

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

function ServiceComponent(props) {
  const [serviceSelection, setServiceSelection] = useState([]);
  const [photoSelection, setPhotoSelection] = useState([]);

  let services = [
    ["Hair Cut", haircut],
    ["Color", haircolor],
    ["Styling", hairset],
    ["Make-up", makeup],
  ];
  return (
    <div className="service-comp-container">
      <UncontrolledDropdown size="lg" className="service-dropdown">
        <DropdownToggle color="danger">
          {serviceSelection.length > 0
            ? serviceSelection
            : "Select our service"}
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
                  props.serviceSelectionParent(ele[0]);
                  setServiceSelection(ele[0]);
                  setPhotoSelection(ele[1]);
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
        {serviceSelection.length > 0 ? (
          <img className="picked-img-service" src={photoSelection} alt="img" />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default ServiceComponent;
