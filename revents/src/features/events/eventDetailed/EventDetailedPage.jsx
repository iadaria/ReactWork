import './event-detailed.scss';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';

export default function EventDetailedPage() {
    return (
        <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
                <EventDetailedHeader />
                <EventDetailedInfo />
                <EventDetailedChat />
            </Grid>
            <Grid item md={4} xs={12}>
                <EventDetailedSidebar />
            </Grid>
        </Grid>
    );
};
