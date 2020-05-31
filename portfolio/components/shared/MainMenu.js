import React, { useState, useEffect } from "react";
import Link from "next/link";
//import { Link as RoutesLink } from "../../routes";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser } from "@/apollo/actions";

const BsLinkClass = ({ route, title, className }) => {
  return (
    <Link href={route}>
      <a className={`${className} nav-link`}> {title}</a>
    </Link>
  );
};

const MainMenu = () => {
  const [user, setUser] = useState(null);
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser(); ///to update date from mongo db
    data && setUser(data.user);
  }, [data]);


  return (
    <div className="header">
      <Navbar
        className="nav"
        collapseOnSelect
        fixed="top"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand className="nav-brand" href="/">
          Daria Iakimova
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <BsLinkClass className="dasha" route="/" title="Home" />

            <BsLinkClass route="/about" title="About" />

            <BsLinkClass route="/portfolios" title="Portfolios" />

            <BsLinkClass route="/blogs" title="Blogs" />

            <BsLinkClass route="/cv" title="CV" />

            {/* <Logout /> */}

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

          <Nav className="ml-auto">
            {user && (
              <>
                <span className="mr-4">Welcom {user.username}</span>
                <BsLinkClass
                  className="btn btn-danger"
                  route="/logout"
                  title="Sign Out"
                />
              </>
            )}
            {(error || !user) && (
              <>
                <BsLinkClass
                  className="mr-3"
                  style={{ cursor: "pointer" }}
                  route="/login"
                  title="Sign In"
                />
                <BsLinkClass
                  className="mr-3 style={{cursor: 'pointer'}} btn btn-success bg-green-2"
                  route="/register"
                  title="Sign Up"
                />
              </>
            )}
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

export default withApollo(MainMenu);
