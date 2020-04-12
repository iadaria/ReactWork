import React, { useContext } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, CardHeader, ButtonGroup } from '@material-ui/core';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

const ActivityDetails: React.FC = () => {
    const classes = useStyles();
    const activityStore = useContext(ActivityStore);
    const {selectedActivity: activity, openEditForm, cancelSelectedActivity} = activityStore;
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    //height="140"
                    image={`/assets/categoryImages/${activity?.category}.jpg`}
                    title="Contemplative Reptile"
                />
                <CardHeader
                    title={activity?.title}
                />
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {activity?.date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {activity?.description}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <ButtonGroup fullWidth>
                    <Button onClick={() => openEditForm(activity!.id)}>Edit</Button>
                    <Button onClick={cancelSelectedActivity} color="primary">Cancel</Button>
                </ButtonGroup>
            </CardActions>
            
            </Card>
    );
};

const useStyles = makeStyles({
    title: {
        fontSize: 14,
      },
  });

export default observer(ActivityDetails);