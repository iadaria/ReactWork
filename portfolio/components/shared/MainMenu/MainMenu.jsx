import React, { useState, useEffect } from "react";
import './main-menu.scss';
import Link from "next/link";
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser, useGetPartWords } from "@/apollo/actions";
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
import languageContext from '../../../contexts/languageContext';

const MainMenu = ({setLanguage}) => {
    const [user, setUser] = useState(null);//{ _id: 1, username: "Dasha", role: "admin" }); //null
    const [getUser, { data, error }] = useLazyGetUser();
    const [anchorE1, setAnchorE1] = useState({
        lang: null,
        user: null,
    });
    const open = {
        lang: Boolean(anchorE1.lang),
        user: Boolean(anchorE1.user),
    };
    const [drawerState, setDrawerState] = useState(false);
    
    const languageCode = React.useContext(languageContext);
    console.log(`languageCode = ${languageCode}`);

    const { data: dataWords } = useGetPartWords({ variables: {languageCode, part: "mainMenu"} });
    //Create one object with many keys
    const words = dataWords && dataWords.partWords.reduce( (prevWords, currentWord) => (
        { ...prevWords, ...{  [currentWord.key]: currentWord.value } }
    ) ) || [];
    console.log('MainMenu -> data.partWords:', words);

    useEffect(() => {
        getUser(); ///to update date from mongo db
        data && setUser(data.user);
    }, [data]);

    const handleMenu = (event, name_anchor) => setAnchorE1({
            ...anchorE1,
            [name_anchor]: event.currentTarget
        });

    const handleClose = (name_anchor) => setAnchorE1({
            ...anchorE1,
           [name_anchor]: null,
        });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState(open);
    }

    const langMenu = (
        <div className="nav-lang">
            <IconButton
                onClick={(event) => handleMenu(event, "lang")}
                color="inherit"
            >
                <img
                    className="nav-lang__img"
                    width={50} height={30}
                    src={`../../../static/images/lang/${languageCode}.png`}
                    alt="language" />
            </IconButton>
            <Menu
                className="nav-lang-menu"
                id="menu-lang"
                anchorEl={anchorE1.lang}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open.lang}
                onClose={handleClose.bind(null, "lang")}
            >
                <MenuItem onClick={handleClose.bind(null, "lang")} style={{padding: 0}}>
                    <IconButton
                        onClick={setLanguage.bind(null, "en")}
                        color="inherit"
                    >
                        <img
                            className="nav-lang__img"
                            width={50} height={30}
                            src="../../../static/images/lang/en.png"
                            alt="the English language" />
                    </IconButton>
                </MenuItem>
                <MenuItem onClick={handleClose.bind(null, "lang")} style={{padding: 0}}>
                    <IconButton
                        onClick={setLanguage.bind(null, "ru")}
                        color="inherit"
                    >
                        <img
                            className="nav-lang__img"
                            width={50} height={30}
                            src="../../../static/images/lang/ru.png"
                            alt="the Russian language" />
                    </IconButton>
                </MenuItem>
            </Menu>
        </div>
    );

    const drawerMenu = (wrapped) => {
        return (
            <>
                <IconButton
                    className="menu-icon"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer(true)}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    className="nav-main-drawer"
                    anchor="left"
                    open={drawerState}
                    onClose={toggleDrawer(false)}
                >
                    <div
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        {wrapped}
                    </div>
                </Drawer>
            </>
        );
    };

    const subMainMenu = (
        <ul className="nav nav-main">
            <li className="nav-item brand">
                <Link href="/"><a>{words?.byName || "by Daria Iakimova"}</a></Link>
            </li>
            <li className="nav-item">
                <HomeIcon className="nav-item-icon" />
                <Link href="/"><a>{words?.home || "Home"}</a></Link>
            </li>
            <li className="nav-item">
                <WorkIcon className="nav-item-icon" />
                <Link href="/portfolios"><a>{words?.portfolio || "Portfolio"}</a></Link>
            </li>
            <li className="nav-item">
                <InfoIcon className="nav-item-icon" />
                <Link href="/about"><a>{words?.about || "About"}</a></Link>
            </li>
        </ul>
    );

    const loginMenu = (
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
    );

    const accountMenu = (
        <div className="nav-account">
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => handleMenu(event, "user")}
                color="inherit"
            >
                <>
                    <Avatar
                        className="nav-account__img"
                        alt={user?.username}
                        src={user?.image || "../../../static/images/user.png"}
                    />
                    <Typography className="nav-account__name" component="b">
                        {user?.username}
                    </Typography>
                </>
            </IconButton>

            <Menu
                className="nav-user"
                id="menu-appbar"
                anchorEl={anchorE1.user}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open.user}
                onClose={handleClose.bind(null, "user")}
            >
                <MenuItem onClick={handleClose.bind(null, "user")}>
                    <Link href="/portfolios/new">
                        <a className="nav-link">Create Portfolio</a>
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose.bind(null, "user")}>
                    <Link
                        href="instructor/[id]/dashboard"
                        as={`instructor/${user?._id}/dashboard`}
                    >
                        <a className="nav-link">Dashboard</a>
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose.bind(null, "user")}>
                    <Link href="/logout">
                        <a className="nav-link">Sign out</a>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );

    return (
        <div className="main-menu">
            <AppBar>
                <Toolbar>
                    {drawerMenu(subMainMenu)}
                    <Typography variant="h6" className="brand">Daria Iakimova</Typography>

                    {subMainMenu}

                    {langMenu}

                    {user && accountMenu}

                    {(error || !user) && loginMenu}
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
