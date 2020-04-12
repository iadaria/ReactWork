import React, { useContext } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, CardHeader, ButtonGroup } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}


const ActivityDetails: React.FC<IProps> = ({setEditMode, setSelectedActivity}) => {
    const classes = useStyles();
    const activityStore = useContext(ActivityStore);
    const {selectedActivity: activity} = activityStore;
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
                    <Button onClick={() => setEditMode(true)}>Edit</Button>
                    <Button onClick={() => setSelectedActivity(null)} color="primary">Cancel</Button>
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