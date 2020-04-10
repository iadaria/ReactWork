import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, CardHeader, ButtonGroup } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';

const useStyles = makeStyles({
    root: {
      //maxWidth: 345,
    },
    title: {
        fontSize: 14,
      },
  });

interface IProps {
    activity: IActivity;
}


export const ActivityDetails: React.FC<IProps> = ({activity}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    //height="140"
                    image={`/assets/categoryImages/${activity.category}.jpg`}
                    title="Contemplative Reptile"
                />
                <CardHeader
                    title={activity.title}
                />
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {activity.date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {activity.description}
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
