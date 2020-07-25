import React from 'react';
import './../public/static/styles/pages/index.scss';
import BaseLayout from '../components/layouts/BaseLayout';
import Grid from '@material-ui/core/Grid';
import Hero from '../components/shared/Hero';
import Services from '../components/shared/Services';
import PortfolioCards from '../components/shared/PortfolioCards';

import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from '@apollo/react-ssr';
import { useLazyGetUser, useGetPartWords } from "@/apollo/actions";
import languageContext from '@/contexts/languageContext';

const Index = () => {
    const languageCode = React.useContext(languageContext);

    const { loading, data: dataWords } = useGetPartWords({ variables: { languageCode, part: "mainPage" } });
    /* Create one object with many keys */
    const words = dataWords && dataWords.partWords.reduce((prevWords, currentWord) => (
        { ...prevWords, ...{ [currentWord.key]: currentWord.value } }
    ), {}) || [];

    return (
        <BaseLayout>

            <Grid className="index" container>

                <Grid className="row-hero" item xs={12}>
                    <Hero words={words}/>
                </Grid>

                <Grid className="row-services" item xs={12}>
                    <Services words={words}/> 
                </Grid> 

                {/* <Grid className="row" item xs={12}>
                    <PortfolioCards />
                </Grid> */}

            </Grid>

        </BaseLayout>
    );
};

export default withApollo(Index, { getDataFromTree });
