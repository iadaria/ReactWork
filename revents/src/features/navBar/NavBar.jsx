import React, { useState, Fragment } from 'react'
import './nav-bar.scss';

import { makeStyles, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import green from '@material-ui/core/colors/green';
import { NavLink } from 'react-router-dom';

export default function NavBar({ setFormOpen }) {

    const [anchorE1, setAnchorE1] = useState(null);
    const open = Boolean(anchorE1);

    const handleMenu = (event) => {
        setAnchorE1(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorE1(null);
    };
    const user = null;
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

                    { !user && (
                        <MenuItem className="btn-user-action">
                            <Button
                                variant="outlined"
                                //omponent={NavLink} to='/createActivity'
                                //onClick={openCreateForm}
                            >
                                Login
                            </Button>
                            <Button
                                variant="outlined"
                                //omponent={NavLink} to='/createActivity'
                                //onClick={openCreateForm}
                            >
                                Register
                            </Button>
                        </MenuItem>
                    )}

                    {/* isLoggedIn &&  */user && (
                        <div className="account">

                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Fragment>
                                    <Avatar
                                        //alt={user!.displayName}
                                        sizes="(max-width: 35px): 30px"
                                    //src={user!.image || '/assets/user.png'}
                                    />
                                    <Typography style={{ marginLeft: 15 }} component="b">
                                        {user?.displayName}
                                    </Typography>
                                </Fragment>
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorE1}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    //component={NavLink}
                                    //to={`/profile/${user?.username}`}
                                    onClick={handleClose}
                                >
                                    My profile
                                </MenuItem>
                                <MenuItem
                                //onClick={logout}
                                >
                                    Logout
                                    </MenuItem>
                            </Menu>
                        </div>
                    )}
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