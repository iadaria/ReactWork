import React, { SyntheticEvent, useContext } from 'react';
import { Grid, Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
    activities, 
    selectActivity, 
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity,
    submitting,
    target }) => {
    
    const classes = useStyles();
    const activityStore = useContext(ActivityStore);
    const {editMode, selectedActivity} = activityStore;

    return (
        <Grid container spacing={3}>        
            <Grid item md={8} sm={6} xs={12}>
                <ActivityList 
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                    target={target}
                />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <Box className={classes.rightPanel} zIndex="modal">
                    {   selectedActivity && !editMode && (
                        <ActivityDetails 
                            setEditMode={setEditMode}
                            setSelectedActivity={setSelectedActivity}
                        />)
                    }    
                    {   editMode && 
                        <ActivityForm 
                            key={(selectedActivity && selectedActivity.id) || 0}
                            setEditMode={setEditMode}
                            activity={selectedActivity!}
                            createActivity={createActivity}
                            editActivity={editActivity} 
                            submitting={submitting}
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