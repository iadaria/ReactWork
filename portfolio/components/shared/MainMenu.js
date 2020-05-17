import React, { useState } from "react";
import Link from "next/link";
//import { Link as RoutesLink } from "../../routes";
//import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";

const BsLinkClass = ({ route, title }) => {
  return (
    <Link href={route}>
      <a className="nav-link"> {title}</a>
    </Link>
  );
};

const Login = () => {
  return (
    <span className="nav-link">Login</span>
  );
};

const Logout = () => {
  return (
    <span className="nav-link">Logout</span>
  );
};

const MainMenu = () => {

  return (
    <div className="header">
      <Navbar
        className="nav"
        collapseOnSelect
        fixed="top"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand className="nav-brand" href="#home">
          Daria Iakimova
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            
              <BsLinkClass route="/" title="Home" />
          
    
              <BsLinkClass route="/about" title="About" />
     
     
              <BsLinkClass route="/portfolios" title="Portfolios" />
 
    
              <BsLinkClass route="/blogs" title="Blogs" />

              <BsLinkClass route="/cv" title="CV" />

              <Login />

              <Logout />

            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {/*  <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MainMenu;