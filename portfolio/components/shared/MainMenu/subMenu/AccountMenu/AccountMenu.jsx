import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from "next/link";
import './account-menu.scss';

const AccountMenu = ({ user, words }) => {
    const [anchorE1, setAnchorE1] = useState(null);
    const open =  Boolean(anchorE1);

    const handleMenu = (event) => 
        setAnchorE1(event.currentTarget);

    const handleClose = () => setAnchorE1(null);

    return (
        <div className="account-menu">
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <>
                    <Avatar
                        className="account-menu__img"
                        alt={user?.username}
                        src={user?.image || "../../../static/images/user.png"}
                    />
                    <Typography className="account-menu__name" component="b">
                        {user?.username}
                    </Typography>
                </>
            </IconButton>

            <Menu
                //className="nav-user"
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
                        <a className="nav-link">{words?.createPortfolio}</a>
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Link
                        href="instructor/[id]/dashboard"
                        as={`instructor/${user?._id}/dashboard`}
                    >
                        <a className="nav-link">{words?.dashboard}</a>
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Link href="/logout">
                        <a className="nav-link">{words?.signOut || "Sign Out"}</a>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AccountMenu;
