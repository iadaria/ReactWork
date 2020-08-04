import React, { useEffect } from 'react';
import './portfolio-cards.scss';
import Grid from '@material-ui/core/Grid';
import PortfolioCard from '../PortfolioCard';

import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useGetLangPortfolios } from '@/apollo/actions';
import { useGetPartWords } from "@/apollo/actions";
import languageContext from '../../../contexts/languageContext';

const PortfolioCards = () => {
    const [show, setShow] = React.useState(false);
    const languageCode = React.useContext(languageContext);
    const { data } = useGetLangPortfolios({ variables: {languageCode} });
    const portfolios = data && data?.langPortfolios || [];
    
    useEffect(() => {
        setShow(window.innerWidth < 400); //default
        function handleResize() {
            const { innerWidth: width } = window; //console.log('width', width);
            setShow(width < 400); //console.log('setShow', width < 400);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { loading, data: dataWords } = useGetPartWords({ variables: { languageCode, part: "portfolios" } });
    const words = dataWords && dataWords.partWords.reduce((prevWords, currentWord) => (
        { ...prevWords, ...{ [currentWord.key]: currentWord.value } }
    ), {}) || [];

    //console.log('data', portfolios);
    //console.log('words', words);

    return (
        <Grid className="portfolio-cards" container justify="center">
            <Grid className="portfolios-header" container item xs={12} justify="center">
                <h1>
                    {words.portfolios_header}
                </h1>
                
            </Grid>
            <Grid className="portfolios-list" container item lg={11} md={12} xs={12} justify="center">
                {portfolios.map((portfolio, index) => (
                    <PortfolioCard key={index} portfolio={portfolio} show={show} words={words} />
                ))}
            </Grid>

        </Grid>
    );
};

export default withApollo(PortfolioCards, {getDataFromTree });