import './event-dashboard.scss';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import EventList from './eventList';
import EventForm from '../eventForm/EventForm';
import { sampleData } from '../../../app/api/sampleData';

export default function EventDashboard({ formOpen, setFormOpen, selectEvent, selectedEvent }) {
    const [events, setEvents] = useState(sampleData);

    function handleCreateEvent(event) {
        setEvents([...events, event]);
        console.log('events', events);
    }

    function handleUpdateEvent(updatedEvent) {
        setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
        selectEvent(null);
        setFormOpen(false);
    }

    function handleDeleteEvent(id) {
        const newEvents = events.filter(event => event.id !== id);
        setEvents(newEvents);
    }

    return (
        <Grid className="event-dashboard" container>
            <Grid style={{ border: '1px solid black' }} item md={8} sm={7} xs={12}>
                <EventList events={events} selectEvent={selectEvent} deleteEvent={handleDeleteEvent}/>
            </Grid>
            <Grid style={{ border: '1px solid black' }} item md={4} sm={5} xs={12}>
                {
                    formOpen && (
                        <EventForm
                            setFormOpen={setFormOpen}
                            setEvents={setEvents}
                            createEvent={handleCreateEvent}
                            selectedEvent={selectedEvent}
                            updateEvent={handleUpdateEvent}
                            /*instead useEffect for EventForm 
                            see React.Component documentatioin
                            UNSAFE_componentWillReceiveProps() */
                            key={selectedEvent ? selectedEvent.id : null} 
                        />
                    )
                }
            </Grid>
        </Grid>
    );
}