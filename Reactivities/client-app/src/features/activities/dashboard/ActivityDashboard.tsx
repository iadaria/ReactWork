import React from 'react';
import { Grid, List, ListItemText } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';
import { ActivityList } from './ActivityList';

interface IProps {
    activities: IActivity[]
}

export const ActivityDashboard: React.FC<IProps> = ({activities}) => {
    return (
        <Grid container>        
            <ActivityList activities={activities}/>
            {/* <List>
                {props.activities.map((activity) => (
                <ListItemText key={activity.id}>{activity.title}</ListItemText>
                ))}
            </List> */}
        </Grid>
    );
};
