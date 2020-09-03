import './event-dashboard.scss';
import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import EventList from './eventList';
import { useSelector, useDispatch } from 'react-redux';
//import LoadingComponent from '../../../app/common/components/LoadingComponent';
import EventListItemSkeleton from './EventListItemSkeleton/EventListItemSkeleton';
import EventFilters from '../eventFilters/EventFilters';
import { /* getEventsFromFirestore,  dataFromSnapshot, */ listenEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import EventsFeed from './EventsFeed/EventsFeed';

export default function EventDashboard() {
    const dispatch = useDispatch();
    const { events } = useSelector(state => state.event);
    const { loading } = useSelector(state => state.async);
    const { authenticated } = useSelector(state => state.auth);
    const [predicate, setPredicate] = useState(new Map([
        ['startDate', new Date()],
        ['filter', 'all']
    ]));

    function handleSetPredicate(key, value) {
        setPredicate( new Map(predicate.set(key, value)) );
    }

    useFirestoreCollection({
        query: () => listenEventsFromFirestore(predicate),
        data: _events => dispatch(listenToEvents(_events)),
        deps: [dispatch, predicate]
    });

    //if (loading) return <LoadingComponent />;

    return (
        <Grid className="event-dashboard" container>
            <Grid className="item" item md={8} sm={7} xs={12}>
                {loading &&
                    <>
                        <EventListItemSkeleton />
                        <EventListItemSkeleton />
                    </>
                }
                {/* <EventListItemSkeleton /> */}
                
                <EventList events={events} />
            </Grid>
            <Grid className="item" item md={4} sm={5} xs={12}>
                { authenticated && <EventsFeed />}
                <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading}/>
            </Grid>
        </Grid>
    );
}

/* 
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../../app/async/asyncReducer';
useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getEventsFromFirestore({
        next: snapshot => {
            dispatch(listenToEvents(
                snapshot.docs.map(docSnapshot => dataFromSnapshot(docSnapshot))
            ));
            dispatch(asyncActionFinish());
        },
        error: error => dispatch(asyncActionError(error)),
        complete: () => console.log('you will never see this message')
    });
    return unsubscribe;
}, [dispatch]); */

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