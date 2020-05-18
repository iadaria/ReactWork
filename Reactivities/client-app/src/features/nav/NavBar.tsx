import React, { useContext, useState, Fragment } from 'react'
import './nav-bar.sass';
import { observer } from 'mobx-react-lite';

import { makeStyles, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import green from '@material-ui/core/colors/green';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

function NavBar() {

    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
    const { openCreateForm } = rootStore.activityStore;
    const { user, logout } = rootStore.userStore;

    const [anchorE1, setAnchorE1] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorE1);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorE1(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorE1(null);
    };

    return (
        <AppBar position="fixed" className="menu nav-bar">
            <Container>
                <Toolbar>
                    <MenuItem component={NavLink} exact to='/'>
                        <img className="menu-item-img" src="/assets/logo.png" alt="logo"
                            style={{ marginRight: '10px' }} />
                        Reactivities
                    </MenuItem>
                    <MenuItem component={NavLink} to='/activities'>
                        Activiteis
                    </MenuItem>
                    <Button
                        component={NavLink} to='/createActivity'
                        onClick={openCreateForm}
                        color="inherit" className={classes.successButton}
                    >
                        Create Activity
                    </Button>
                    {/* isLoggedIn &&  */user && (
                        <div className="account">
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                {
                                    (/* !user ||  */user?.image !== null) 
                                        ? 
                                            <Fragment>
                                                <AccountCircle />
                                                <Typography component="b">Dasha</Typography>
                                            </Fragment>
                                        : 
                                            <Fragment>
                                                <Avatar alt="Remy Sharp" src={user!.image || '/assets/user.png'}/>
                                                <Typography component="b">{user!.displayName}</Typography>
                                            </Fragment>
                                }
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
                                    component={NavLink}
                                    to='/profile/username'
                                    onClick={handleClose}
                                >
                                    My profile
                                </MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const useStyles = makeStyles({
    successButton: {
        backgroundColor: green[500],
        textTransform: "none",
        whiteSpace: "nowrap",
    }
});

export default observer(NavBar);