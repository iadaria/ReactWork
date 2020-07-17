import React from 'react';
import './base-layout.scss';
import MainMenu from "@/components/shared/MainMenu";
import { ToastContainer } from 'react-toastify';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import languageContext from '../../contexts/languageContext';

const BaseLayout = (props) => {
    const [lang, setLanguage] = React.useState('ru');
    const { className, children } = props;
    return (
        <ThemeProvider theme={theme}>
            <languageContext.Provider value={lang}>
                <div className="base-layout"> {/* It's need for provider */}
                    <header>
                        {/* <Container>  don't work */}
                            <MainMenu setLanguage={setLanguage} />
                        {/* </Container> */}
                    </header>
                    <main style={{ height: '500vh' }}>
                        {children}
                    </main>
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
});

export default BaseLayout;