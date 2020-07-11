import React, { useState, useEffect } from "react";
import './main-menu.scss';
import Link from "next/link";
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser } from "@/apollo/actions";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import WorkIcon from '@material-ui/icons/Work';

const MainMenu = () => {
    const [user, setUser] = useState(null);//({ _id: 1, username: "Dasha", role: "admin" }); //null
    const [getUser, { data, error }] = useLazyGetUser();

    const [anchorE1, setAnchorE1] = useState(null);
    const [drawerState, setDrawerState] = useState(false);
    const open = Boolean(anchorE1);
    /* useEffect(() => {
        getUser(); ///to update date from mongo db
        data && setUser(data.user);
    }, [data]); */

    const handleMenu = (event) => setAnchorE1(event.currentTarget);
    const handleClose = () => setAnchorE1(null);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState(open);
    }

    const drawerMenu = (wrapped) => {
        return (
            <Drawer
                anchor="left"
                open={drawerState}
                onClose={toggleDrawer(false)}
                className="nav-main-drawer"
            >
                <div
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    {wrapped}
                </div>
            </Drawer>
        );
    };

    const mainMenu = (
        <ul className="nav nav-main">
            <li className="nav-item">
                <HomeIcon className="nav-item-icon"/>
                <Link href="/"><a>Home</a></Link>
            </li>
            <li className="nav-item">
                <WorkIcon className="nav-item-icon"/>
                <Link href="/portfolios"><a>Portfolio</a></Link>
            </li>
            <li className="nav-item">
                <InfoIcon className="nav-item-icon"/>
                <Link href="/about"><a>About</a></Link>
            </li>
        </ul>
    );

    return (
        <div className="main-menu">
            <AppBar>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        edge="start"
                        className="menu-icon"
                    >
                        <MenuIcon />
                    </IconButton>
                    {drawerMenu(mainMenu)}
                    <Typography variant="h6" className="brand">Daria Iakimova</Typography>
                    {mainMenu}

                    {user && (
                        <div className="account">

                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <>
                                    <Avatar
                                        alt={user?.username}
                                        sizes="(max-width: 35px): 30px"
                                        src={user?.image || '/assets/user.png'}
                                    />
                                    <Typography style={{ marginLeft: 15 }} component="b">
                                        {user?.username}
                                    </Typography>
                                </>
                            </IconButton>

                            <Menu
                                className="nav-user"
                                id="menu-appbar"
                                anchorEl={anchorE1}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link href="/portfolios/new">
                                        <a className="nav-link">Create Portfolio</a>
                                    </Link>
                                </MenuItem>

                                <MenuItem onClick={handleClose}>
                                    <Link
                                        href="instructor/[id]/dashboard"
                                        as={`instructor/${user._id}/dashboard`}
                                    >
                                        <a className="nav-link">Dashboard</a>
                                    </Link>
                                </MenuItem>

                                <MenuItem onClick={handleClose}>
                                    <Link href="/logout">
                                        <a className="nav-link">Sign out</a>
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}

                    {(error || !user) && (
                        <ul className="nav nav-auth">
                            <li className="nav-item">
                                <Link href="/login"><a>Sign In</a></Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="btn btn-signup" href="/register">
                                    <a>Sign Up</a>
                                </Link>
                            </li> */}
                        </ul>
                    )}
                </Toolbar>
            </AppBar>
        </div>
/* 

    const AppLink = ({ children, className, href, as, ...props }) => (
        <Link href={href} as={as}>
            <a className={className} {...props}>{children}</a>
        </Link>
    );
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
