import './signed-in-menu.scss';
import React, { useState, Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
//import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { /* useDispatch,  */useSelector } from 'react-redux';
//import { signOutUser } from '../auth/authActions';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../app/firestore/firebaseService';

export default function SignedInMenu() {
    //const { currentUser } = useSelector(state => state.auth);
    const { currentUserProfile } = useSelector((state) => state.profile);
    const history = useHistory();

    const [anchorE1, setAnchorE1] = useState(null);
    const open = Boolean(anchorE1);

    const handleMenu = (event) => {
        setAnchorE1(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorE1(null);
    };

    async function handleSignOut() {
        try {
            await signOutFirebase();
            history.push('/');
        } catch(error) {
            toast.error(error.message);
        } finally { handleClose(); }
    }

    //console.log('currentUserProfile', currentUserProfile);

    return (
        <div 
            className="signed-in-menu account"
        >
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Fragment>
                    <Avatar
                        alt={currentUserProfile?.email || currentUserProfile?.displayName}
                        sizes="(max-width: 35px): 30px"
                        src={currentUserProfile?.photoURL || '/assets/user.png'}
                    />
                    <Typography style={{ marginLeft: 15 }} component="b">
                        {currentUserProfile?.email || currentUserProfile?.displayName}
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
                    component={NavLink}
                    to="/createEvent"
                    onClick={handleClose}
                >
                    <AddCircleOutlineIcon style={{marginRight: 5}} fontSize="small" />
                    Create Event
                </MenuItem>

                <MenuItem
                    component={NavLink}
                    to={`/profile/${currentUserProfile?.id}`}
                    onClick={handleClose}
                >
                    <AccountBoxIcon style={{marginRight: 5}} fontSize="small" />
                    My profile
                </MenuItem>

                <MenuItem
                    component={NavLink}
                    to="/account"
                    onClick={handleClose}
                >
                    <SettingsIcon style={{marginRight: 5}} fontSize="small" />
                    My account
                </MenuItem>

                <MenuItem onClick={handleSignOut}>
                    <ExitToAppIcon style={{marginRight: 5}} fontSize="small"/>
                    Sign Out
                </MenuItem>
            </Menu>
        </div>
    );
}
