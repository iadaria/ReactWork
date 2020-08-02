import React from 'react';
import './../public/static/styles/pages/index.scss';
import BaseLayout from '../components/layouts/BaseLayout';
import Grid from '@material-ui/core/Grid';
import Hero from '../components/shared/Hero';
import Services from '../components/shared/Services';
import PortfolioCards from '../components/shared/PortfolioCards';

//import withApollo from "@/hoc/withApollo";
//import { getDataFromTree } from '@apollo/react-ssr';

const Index = () => {

    return (
        <BaseLayout>

            <Grid className="index" container justify="center">

                <Grid className="row-hero" item xs={12}>
                    <Hero/>
                </Grid>

                <Grid className="row-services" item xs={12}>
                    <Services/> 
                </Grid> 

                <Grid className="row-portfolios" item xs={12}>
                    <PortfolioCards />
                </Grid>

            </Grid>

        </BaseLayout>
    );
};

export default Index;
