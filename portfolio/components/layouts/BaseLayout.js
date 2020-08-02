import React from 'react';
import './base-layout.scss';

import MainMenu from "@/components/shared/MainMenu";
import Footer from '../shared/Footer';
import { ToastContainer } from 'react-toastify';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import languageContext from '../../contexts/languageContext';

const BaseLayout = (props) => {
    const [lang, setLanguage] = React.useState('ru');
    const { className, children } = props;
    return (
        <ThemeProvider theme={theme}>
            <languageContext.Provider value={lang}>
                <div className="base-layout"> {/* It's need for provider */}
                    {/* header */}
                    <MainMenu setLanguage={setLanguage} />
                    
                    <main> 
                        {children}
                    </main>

                    <footer>
                        <Container>
                            <Footer />
                        </Container>
                    </footer>

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

//style={{ height: '500vh' }}