import React from 'react';
import './portfolio-cards.scss';
import Grid from '@material-ui/core/Grid';
import PortfolioCard from '../PortfolioCard';
import data from '@/server/fakeDb/data';

const PortfolioCards = () => {

    return (
        <Grid className="portfolio-cards" container justify="center" style={{ border: '1px solid black' }}>
            <Grid className="portfolios-header" container item xs={11} justify="center">
                <h1>
                    Portfolios
                </h1>
            </Grid>

            {data.portfolios.map(portfolio => (
                <Grid key={portfolio.title} className="item" container item md={3} xs={11}>
                    <PortfolioCard portfolio={portfolio} />
                </Grid>
            ))}

            {/* {data.portfolios.map(portfolio => (
                <Grid key={portfolio.title} className="item" container item md={4} xs={11} justify="center">
                    <PortfolioCard card={portfolio} />
                </Grid>
            ))} */}

        </Grid>
    );
};

export default PortfolioCards;
