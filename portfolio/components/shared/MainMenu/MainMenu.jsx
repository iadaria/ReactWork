import React, { useState, useEffect } from "react";
import './main-menu.scss';
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser, useGetPartWords } from "@/apollo/actions";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import languageContext from '../../../contexts/languageContext';
import Skeleton from '@material-ui/lab/Skeleton';
import LangMenu from "./subMenu/LangMenu";
import AccountMenu from "./subMenu/AccountMenu";
import LoginMenu from "./subMenu/LoginMenu";
import NavMenu from "./subMenu/NavMenu";
import DrawerMenu from "./subMenu/DrawerMenu/DrawerMenu";

const MainMenu = ({ setLanguage }) => {
    const [user, setUser] = useState(null);//{ _id: 1, username: "Dasha", role: "admin" }); //null
    const [getUser, { data, error }] = useLazyGetUser();
    useEffect(() => {
        getUser(); ///to update date from mongo db
        data && setUser(data.user);
    }, [data]);

    const languageCode = React.useContext(languageContext);
    const { loading, data: dataWords } = useGetPartWords({ variables: { languageCode, part: "mainMenu" } });
    /* Create one object with many keys */
    const words = dataWords && dataWords.partWords.reduce((prevWords, currentWord) => (
        { ...prevWords, ...{ [currentWord.key]: currentWord.value } }
    ), {}) || [];
    console.log('MainMenu -> data.partWords:', words);

    const test_loading = true;
    return (
        <AppBar>
            <Toolbar>
                <DrawerMenu loading={test_loading} words={words} />

                {test_loading ? (
                    <Skeleton width="10%" component="h1"/>
                ) : (
                    <Typography variant="h6" className="brand">{words?.byName}</Typography>
                )}
                
                {test_loading ? (
                    <Skeleton width="70%" component="h1" style={{marginLeft: "3%"}} />
                ): <NavMenu words={words} /> }

                <LangMenu languageCode={languageCode} setLanguage={setLanguage} />

                {user && <AccountMenu user={user} words={words}/>}

                {(error || !user) && (
                    test_loading 
                    ? <Skeleton width="10%" component="h1"/>
                    : <LoginMenu words={words}/>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default withApollo(MainMenu);

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
   );
};*/