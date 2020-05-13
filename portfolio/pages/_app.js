import React from 'react';
import App from 'next/app';


// Styless
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps: pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Component {...pageProps} />
        );
    };
};