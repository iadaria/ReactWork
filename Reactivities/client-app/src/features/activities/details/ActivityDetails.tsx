import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, CardHeader, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    title: {
        fontSize: 14,
      },
  });


export const ActivityDetails = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>

            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    //height="140"
                    image="/assets/placeholder.png"
                    title="Contemplative Reptile"
                />
                <CardHeader
                    title="Title" 
                />
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Date
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Description
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <ButtonGroup fullWidth>
                    <Button>Edit</Button>
                    <Button color="primary">Cancel</Button>
                </ButtonGroup>
            </CardActions>
            
        </Card>
    );
};
