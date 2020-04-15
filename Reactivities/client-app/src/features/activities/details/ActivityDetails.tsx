import React, { useContext, useEffect } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, CardHeader, ButtonGroup } from '@material-ui/core';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history }) => {
    const classes = useStyles();
    const activityStore = useContext(ActivityStore);
    const {activity, loadActivity, loadingInitial} = activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    if(loadingInitial || !activity) return <LoadingComponent content='Loading activity...'/>;

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
                    <Button component={Link} to={`/manage/${activity.id}`}>Edit</Button>
                    {/* <Button onClick={cancelactivity} color="primary">Cancel</Button> */}
                    <Button onClick={() => history.push('/activities')} color="primary">Cancel</Button>
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