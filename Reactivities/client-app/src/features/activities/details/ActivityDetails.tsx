import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, CardHeader, ButtonGroup, Box } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';

const useStyles = makeStyles({
    title: {
        fontSize: 14,
      },
  });

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
}


export const ActivityDetails: React.FC<IProps> = ({activity, setEditMode}) => {
    const classes = useStyles();

    return (
        <Card>
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
                    <Button onClick={() => setEditMode(true)}>Edit</Button>
                    <Button color="primary">Cancel</Button>
                </ButtonGroup>
            </CardActions>
            
            </Card>
    );
};
