import React from 'react';
import { Grid, Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
    activities, 
    selectActivity, 
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>        
            <Grid item md={8} sm={6} xs={12}>
                <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <Box className={classes.rightPanel} zIndex="modal">
                    {   selectedActivity && !editMode && (
                        <ActivityDetails 
                            activity={selectedActivity} 
                            setEditMode={setEditMode}
                            setSelectedActivity={setSelectedActivity}
                        />)
                    }    
                    {   editMode && 
                        <ActivityForm 
                            setEditMode={setEditMode}
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