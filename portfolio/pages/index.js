import React from 'react';
import '../styles/pages/index.scss';
import BaseLayout from '../components/layouts/BaseLayout';
//import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hero from '../components/shared/Hero';
import Services from '../components/shared/Services';
import Cards from '../components/shared/Cards';

import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '@/hoc/withApollo';

const Index = () => {
    return (
        <BaseLayout>

            <Grid className="index" container>

                <Grid className="row" item xs={12}>
                    <Hero />
                </Grid>

                <Grid className="row" item xs={12}>
                    <Services /> 
                </Grid> 

                <Grid className="row" item xs={12}>
                    <Cards />
                </Grid>

            </Grid>

        </BaseLayout>
    );
};

export default withApollo(Index, { getDataFromTree });
