import React from 'react';
import './base-layout.scss';
import MainMenu from "@/components/shared/MainMenu";
import { ToastContainer } from 'react-toastify';
import { Container } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const BaseLayout = (props) => {
    const { className, children } = props;
    return (
        <ThemeProvider theme={theme}>
            <div className="base-layout"> {/* It's need for provider */}
                <header>
                    <Container style={{ border: '1px solid yellow' }}>
                        <MainMenu />
                    </Container>
                </header>
                <main style={{height: '200vh'}}></main>
                <footer></footer>
                {/* <main className={`cover ${className}`}>
                    <Container className="wrapper">
                        {children}
                    </Container>
                </main> */}
                <ToastContainer />
            </div>
        </ThemeProvider>
    );
};

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'Helvetica',
            '"Segoe UI"',
            'Roboto',
        ].join(','),
    },
    /*  overrides: {
         MuiCssBaseline: {
             '@global': {
                 '@font-face': [name],
             },
         },
     }, */
});

export default BaseLayout;