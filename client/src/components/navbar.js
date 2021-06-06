import React, { useState } from "react";
import "./navbar.css";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarToggler,
  Nav,
  Collapse,
} from "reactstrap";

function NavbarSection() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-con">
      <Navbar color="dark" light expand="md" className="navbar-dark">
        <NavbarBrand href="/" className="navbar-brand">
          Hair Salon
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="navbar-toggler" />
        <Collapse isOpen={isOpen} navbar className="collapse-mobile">
          <Nav id="nav" className="navbar_desk" navbar>
            <NavItem>
              <NavLink href="/service/">Service</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/booking/">Book Now</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/Yuchan48/">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarSection;
