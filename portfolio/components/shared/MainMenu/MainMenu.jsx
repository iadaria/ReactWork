import React, { useState, useEffect } from "react";
import './main-menu.scss';
import Link from "next/link";
//import { Link as RoutesLink } from "../../routes";
//import Nav from "react-bootstrap/Nav";
//import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser } from "@/apollo/actions";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const AppLink = ({ children, className, href, as, ...props }) => (
    <Link href={href} as={as}>
        <a className={className} {...props}>{children}</a>
    </Link>
);

const MainMenu = () => {
    const [user, setUser] = useState(null);
    const [getUser, { data, error }] = useLazyGetUser();

    useEffect(() => {
        getUser(); ///to update date from mongo db
        data && setUser(data.user);
    }, [data]);

    return (
        <div className="main-menu">
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" className="brand">Daria Iakimova</Typography>
                    <Button className="btn-login">Login</Button>
                </Toolbar>
                
            </AppBar>
        </div>
/* 
      <Navbar
        className="main-menu nav"
        collapseOnSelect
        //fixed="top"
        variant="dark"
        expand="lg"
      >
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">
          Daria Iakimova
        </AppLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <AppLink href="/" className="nav-link mr-3">
              Home
            </AppLink>
            <AppLink href="/about" className="nav-link mr-3">
              About
            </AppLink>
            <AppLink href="/portfolios" className="nav-link mr-3">
              Portfolios
            </AppLink>
            <AppLink href="/forum/categories" className="nav-link mr-3">
              Forum
            </AppLink>
            <AppLink href="/cv" className="mr-3 nav-link">
              Cv
            </AppLink>
          </Nav>

          <Nav className="ml-auto">
            {user && (
              <>
                <span className="mr-4">Welcom {user.username}</span>
                <NavDropdown className="mr-2" title="Manage" id="nav-dropdown">
                  {(user.role === "admin" || user.role === "instructor") && (
                    <>
                      <AppLink href="/portfolios/new" className="dropdown-item">
                        Create Portfolio
                      </AppLink>
                      <AppLink 
                        href="instructor/[id]/dashboard" 
                        as={`instructor/${user._id}/dashboard`}
                        className="dropdown-item">
                        Dashboard
                      </AppLink>
                    </>
                  )}
                </NavDropdown>

                <AppLink className="nav-link btn btn-danger" href="/logout">
                  Sign Out
                </AppLink>
              </>
            )}

            {(error || !user) && (
              <>
                <AppLink href="/login" className="mr-3 nav-link">
                  Sign In
                </AppLink>
                <AppLink
                  href="/register"
                  className="mr-3 btn btn-success bg-green-2 bright"
                >
                  Sign Up
                </AppLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
   */);
};

export default withApollo(MainMenu);
