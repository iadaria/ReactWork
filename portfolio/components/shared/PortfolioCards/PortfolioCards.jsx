import React from 'react';
import './cards.scss';
import Grid from '@material-ui/core/Grid';
import PortfolioCard from '../PortfolioCard';

const PortfolioCards = () => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <Grid className="portfolio-cards" container justify="center" style={{ border: '1px solid black' }}>
            <Grid className="portfolios-header" container item xs={11} justify="center">
                <h1>
                    Portfolios
                </h1>
            </Grid>

            <Grid /*className="item"*/ container item md={3} xs={11}>
                <PortfolioCard />
            </Grid>

        </Grid>
    );
};

export default PortfolioCards;
