import React from 'react';
import './nav-bar.scss';

import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import green from '@material-ui/core/colors/green';
import { NavLink } from 'react-router-dom';
import SignedOutMenu from '../SignedOutMenu';
import SignedInMenu from '../SignedInMenu';

export default function NavBar({ setFormOpen }) {

    const user = { displayName: "Dasha"};
    const classes = useStyles();
    return (
        <AppBar position="fixed" className="menu nav-bar">
            <Container>
                <Toolbar>
                    <MenuItem
                        component={NavLink} exact to='/'
                    >
                        <img className="menu-item-img" src="/assets/logo.png" alt="logo"
                            style={{ height: 50, marginRight: '10px' }} />
                        Re-vents
                    </MenuItem>
                    
                    <MenuItem
                        component={NavLink} to='/events'
                    >
                        Events
                    </MenuItem>

                    <MenuItem>
                        <Button
                            component={NavLink} to='/createForm'
                            onClick={ setFormOpen.bind(null, true) }
                            color="inherit" className={classes.successButton}
                        >
                            Create event
                        </Button>
                    </MenuItem>

                    { !user && <SignedOutMenu />}

                    {/* isLoggedIn &&  */user && <SignedInMenu user={user} />}
                </Toolbar>
            </Container>
        </AppBar>
    )
};

const useStyles = makeStyles({
    successButton: {
        backgroundColor: green[500],
        textTransform: "none",
        whiteSpace: "nowrap",
    }
});