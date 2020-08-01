import React, { useState } from 'react';
//import './drawer-menu.scss';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import WorkIcon from '@material-ui/icons/Work';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Link from "next/link";
import SkeletonDrawerMenu from './SkeletonDrawerMenu';

const DrawerMenu = ({ loading, words }) => {
    const [drawerState, setDrawerState] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState(open);
    }

    return (
        <div className="drawer-menu">
            <IconButton
                className="drawer-menu__icon"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="left"
                open={drawerState}
                onClose={toggleDrawer(false)}
            >
                <ul className="drawer-menu__menu"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                > 
                    {loading ? <SkeletonDrawerMenu /> : (
                        <>
                            <li className="nav-item brand">
                                <Link href="/"><a>{words?.byName}</a></Link>
                            </li>

                            <li className="nav-item">
                                <HomeIcon className="nav-item-icon" />
                                <Link href="/"><a>{words?.home}</a></Link>
                            </li>

                            <li className="nav-item">
                                <WorkIcon className="nav-item-icon" />
                                <Link href="/portfolios"><a>{words?.portfolio}</a></Link>
                            </li>
                            
                            {/* <li className="nav-item">
                                <InfoIcon className="nav-item-icon" />
                                <Link href="/about"><a>{words?.about}</a></Link>
                            </li> */}
                        </>
                    )}
                </ul>
            </Drawer>
        </div>
    );
};

export default DrawerMenu;
