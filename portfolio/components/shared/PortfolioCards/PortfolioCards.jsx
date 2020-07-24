import React from 'react';
import './portfolio-cards.scss';
import Grid from '@material-ui/core/Grid';
import PortfolioCard from '../PortfolioCard';
//import data from '@/server/fakeDb/data';
import Link from 'next/link';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useGetPortfolios } from '@/apollo/actions';

const PortfolioCards = () => {
    //const { portfolios } = data;
    const { data } = useGetPortfolios();
    const portfolios = data && data.portfolios || [];
    //console.log('portfolios', portfolios);

    return (
        <Grid className="portfolio-cards" container justify="center" style={{ border: '1px solid black' }}>
            <Grid className="portfolios-header" container item xs={12} justify="center">
                <h1>
                    Portfolios
                </h1>
                
            </Grid>
            <Grid className="portfolios-list" container item lg={11} md={12} xs={12} justify="center">
                {portfolios.map((portfolio, index) => (
                    <PortfolioCard key={index} portfolio={portfolio} />
                ))}
            </Grid>

            {/* {data.portfolios.map(portfolio => (
                <Grid key={portfolio.title} className="item" container item md={4} xs={11} justify="center">
                    <PortfolioCard card={portfolio} />
                </Grid>
            ))} */}

        </Grid>
    );
};

export default withApollo(PortfolioCards, {getDataFromTree });