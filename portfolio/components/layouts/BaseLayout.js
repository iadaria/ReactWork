import React from 'react';
import './base-layout.scss';
import MainMenu from "@/components/shared/MainMenu";
import { ToastContainer } from 'react-toastify';
import { Container } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import languageContext from '../../contexts/languageContext';

const BaseLayout = (props) => {
    const [lang, setLanguage] = React.useState('en');
    const { className, children } = props;
    return (
        <ThemeProvider theme={theme}>
            <languageContext.Provider value={lang}>
                <div className="base-layout"> {/* It's need for provider */}
                    <header>
                        <Container style={{ border: '1px solid yellow' }}>
                            <MainMenu setLanguage={setLanguage}/>
                        </Container>
                    </header>
                    <main style={{ height: '200vh' }}></main>
                    <footer></footer>
                    {/* <main className={`cover ${className}`}>
                    <Container className="wrapper">
                        {children}
                    </Container>
                </main> */}
                    <ToastContainer />
                </div>
            </languageContext.Provider>
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