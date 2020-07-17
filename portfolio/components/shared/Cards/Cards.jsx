import React from 'react';
import './cards.scss';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const Cards = () => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <Grid className="cards" container justify="center" style={{ border: '1px solid black' }}>
            <Grid className="portfolios-header" container item xs={11} justify="center">
                <h1>
                    Portfolios
                </h1>
            </Grid>

            <Grid /*className="item"*/ container item md={3} xs={11}>
                <Card className="card">

                    <CardHeader
                        title="title"
                        subheader="subheader"
                        image=""
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
            </Grid>

        </Grid>
    );
};

export default Cards;
