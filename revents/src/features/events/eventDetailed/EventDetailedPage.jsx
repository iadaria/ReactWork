import './event-detailed.scss';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import { useSelector } from 'react-redux';

export default function EventDetailedPage({ match }) {
    const event = useSelector(state => 
        state.event.events.find(e => e.id === match.params.id)
    );

    return (
        <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
                <EventDetailedHeader event={event}/>
                <EventDetailedInfo event={event}/>
                <EventDetailedChat />
            </Grid>
            <Grid item md={4} xs={12}>
                <EventDetailedSidebar attendees={event.attendees}/>
            </Grid>
        </Grid>
    );
};
