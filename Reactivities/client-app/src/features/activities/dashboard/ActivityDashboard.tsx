import React from 'react';
import { Grid } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';

interface IProps {
    activities: IActivity[]
}

export const ActivityDashboard: React.FC<IProps> = ({activities}) => {
    return (
        <Grid container spacing={3}>        
            <Grid item md={8} sm={6} xs={12}>
                <ActivityList activities={activities}/>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <ActivityDetails />
            </Grid>
        </Grid>
    );
};
