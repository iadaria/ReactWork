import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityStore from '../../../app/stores/activityStore';

import { Grid, Box, makeStyles, Theme, createStyles } from '@material-ui/core';

const ActivityDashboard: React.FC = () => {
    
    const classes = useStyles();
    const activityStore = useContext(ActivityStore);
    const { editMode, selectedActivity } = activityStore;

    return (
        <Grid container spacing={3}>        
            <Grid item md={8} sm={6} xs={12}>
                <ActivityList />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <Box className={classes.rightPanel} zIndex="modal">
                    {   selectedActivity && !editMode && <ActivityDetails />}    
                    {   editMode && 
                        <ActivityForm 
                            key={(selectedActivity && selectedActivity.id) || 0}
                            activity={selectedActivity!}
                        />
                    }
                </Box>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) => createStyles({
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
);

export default observer(ActivityDashboard);