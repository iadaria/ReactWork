import './event-dashboard.scss';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import EventList from './eventList';
import EventForm from '../eventForm/EventForm';
import { sampleData } from '../../../app/api/sampleData';

export default function EventDashboard({ formOpen, setFormOpen }) {
    const [events, setEvents] = useState(sampleData);
    

    return (
        <Grid className="event-dashboard" container>
            <Grid style={{border: '1px solid black'}} item md={8} sm={7} xs={12}>
                <EventList events={sampleData}/>
            </Grid>
            <Grid style={{border: '1px solid black'}} item md={4} sm={5} xs={12}>
                {
                   formOpen && <EventForm setFormOpen={setFormOpen}/>
                }
            </Grid>
        </Grid>
    );
}