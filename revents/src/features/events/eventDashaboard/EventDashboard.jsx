import './event-dashboard.scss';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import EventList from './eventList';
import { useSelector } from 'react-redux';

export default function EventDashboard() {
    const { events } = useSelector(state => state.event);

    return (
        <Grid className="event-dashboard" container>
            <Grid className="item" item md={8} sm={7} xs={12}>
                <EventList events={events} />
            </Grid>
            <Grid className="item" item md={4} sm={5} xs={12}>
                <h2>Event Filters</h2>
            </Grid>
        </Grid>
    );
}

/* formOpen && (
    <EventForm
        setFormOpen={setFormOpen}
        setEvents={setEvents}
        createEvent={handleCreateEvent}
        selectedEvent={selectedEvent}
        updateEvent={handleUpdateEvent}
        /*instead useEffect for EventForm 
        see React.Component documentatioin
        UNSAFE_componentWillReceiveProps()
        {selectedEvent ? selectedEvent.id : null} 
    />
) */

/* const [events, setEvents] = useState(sampleData);

function handleCreateEvent(event) {
    setEvents([...events, event]);
    console.log('events', events);
}

function handleUpdateEvent(updatedEvent) {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    //selectEvent(null);
    //setFormOpen(false);
}

function handleDeleteEvent(id) {
    const newEvents = events.filter(event => event.id !== id);
    setEvents(newEvents);
} */