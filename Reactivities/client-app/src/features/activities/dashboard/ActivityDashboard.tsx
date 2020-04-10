import React from 'react';
import { Grid } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null
}

export const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, selectedActivity}) => {
    return (
        <Grid container spacing={3}>        
            <Grid item md={8} sm={6} xs={12}>
                <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                {/* if selectedActivity != null */}
                {selectedActivity && <ActivityDetails activity={selectedActivity}/>}
                <ActivityForm />
            </Grid>
        </Grid>
    );
};
