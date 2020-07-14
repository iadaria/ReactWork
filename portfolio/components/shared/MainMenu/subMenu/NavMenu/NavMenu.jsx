import React from 'react';
import './nav-menu.scss';
import '../sub-menu.scss';
import Link from "next/link";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import WorkIcon from '@material-ui/icons/Work';

const NavMenu = ({ words }) => {
    return (
        <ul className="sub-menu nav-menu">
        {/* "nav nav-main"> */}
            <li className="nav-item brand">
                <Link href="/"><a>{words.byName}</a></Link>
            </li>
            <li className="nav-item">
                <HomeIcon className="nav-item-icon" />
                <Link href="/"><a>{words.home}</a></Link>
            </li>
            <li className="nav-item">
                <WorkIcon className="nav-item-icon" />
                <Link href="/portfolios"><a>{words.portfolio}</a></Link>
            </li>
            <li className="nav-item">
                <InfoIcon className="nav-item-icon" />
                <Link href="/about"><a>{words.about}</a></Link>
            </li>
        </ul>
    );
};

export default NavMenu;
