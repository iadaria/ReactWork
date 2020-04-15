import React from 'react';
import { observer } from 'mobx-react-lite';

import ActivityList from './ActivityList';
//import ActivityDetails from '../details/ActivityDetails';
//import ActivityForm from '../form/ActivityForm';
//import ActivityStore from '../../../app/stores/activityStore';

import { Grid } from '@material-ui/core';
//import { Route, withRouter } from 'react-router-dom';

const ActivityDashboard: React.FC = () => {
    
    //const classes = useStyles();
    //const activityStore = useContext(ActivityStore);
    //const { editMode, activity } = activityStore;

    return (
        <Grid container spacing={3}>        
            <Grid item md={8} sm={6} xs={12}>
                <ActivityList />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <h1>Activity filter</h1>
                {/* <Box className={classes.rightPanel} zIndex="modal">
                    {   activity && !editMode && <ActivityDetails />}
                    {   editMode && 
                        <ActivityForm 
                            key={(activity && activity.id) || 0}
                            activity={activity!}
                        />
                    }
                </Box> */}
            </Grid>
        </Grid>
    );
};

/* const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        fontSize: 14,
    },
    rightPanel: {
        position: "fixed",
        maxWidth: 400,
        [theme.breakpoints.down('xs')]: {
            position: "static",
            border: 1, 
            margin: "auto"
        }
    }
  })
); */

export default observer(ActivityDashboard);