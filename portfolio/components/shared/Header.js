import React, { Fragment } from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <Fragment>
            <Link href="/">
                <a>Home</a>
            </Link><br/>
            <Link href="/about">
                <a>About</a>
            </Link><br/>
            <Link href="/portfolios">
                <a>Portfolios</a>
            </Link><br/>
            <Link href="/blogs">
                <a>Blogs</a>
            </Link><br/>
            <Link href="/cv">
                <a>CV</a>
            </Link><br/>
        </Fragment>
    );
};

export default Header;
