import React from 'react';
import Link from "next/link";
import './login-menu.scss';
import '../sub-menu.scss';

const LoginMenu = ({ words }) => {
    return (
        // <ul className="nav nav-auth">
        <ul className="sub-menu login-menu">
            <li className="nav-item">
                <Link href="/login"><a>{words.singIn}</a></Link>
            </li>
            {/* <li className="nav-item">
                <Link className="btn btn-signup" href="/register">
                    <a>Sign Up</a>
                </Link>
            </li> */}
        </ul>
    );
};

export default LoginMenu;
