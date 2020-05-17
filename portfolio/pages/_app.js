import React from 'react';
import App from 'next/app';
import MainMenu from '../components/shared/MainMenu';


// Styless
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

const MyApp = ({Component, pageProps}) =>  {
    console.log(Component);
    return (
        <div className="portfolio-app">
            <MainMenu />
            <div>
                <Component {...pageProps} />
            </div>
        </div>
    );
};

export default MyApp;

/* export default class MyApp extends App {
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
}; */