import React from 'react';
import './portfolio-card.scss';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const PortfolioCard = () => {
    return (
        <Card className="portfolio-card">

            <CardHeader
                title="title"
                subheader="subheader"
            />
            <div
                className="card-media__wrapper"
                onMouseOver={() => { console.log('mouse over'); setExpanded(true); }}
                onMouseLeave={setExpanded.bind(null, false)}
            />
            <CardMedia
                className="card-media"
                image='../../../static/images/portfolios/test1.png'
            />
            <Slide direction="up" in={expanded}>
                <CardContent className="card-content">
                    <div className="content__wrapper" />
                    <div className="content">
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                                </Typography>
                    </div>
                </CardContent>

            </Slide>

        </Card>
    );
};

export default PortfolioCard;
