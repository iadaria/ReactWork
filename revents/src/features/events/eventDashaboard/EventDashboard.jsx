import './event-dashboard.scss';
import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import EventList from './eventList';
import { useSelector, useDispatch } from 'react-redux';
//import LoadingComponent from '../../../app/common/components/LoadingComponent';
import EventListItemSkeleton from './EventListItemSkeleton/EventListItemSkeleton';
import EventFilters from '../eventFilters/EventFilters';
//import { /* getEventsFromFirestore,  dataFromSnapshot, */ fetchEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { /* listenToEvents, */ fetchEvents, clearEvents } from '../eventActions';
//import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import EventsFeed from './EventsFeed/EventsFeed';
//import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

export default function EventDashboard() {
    const dispatch = useDispatch();
    const limit = 3;
    const { events, moreEvents } = useSelector(state => state.event);
    const { loading } = useSelector(state => state.async);
    const { authenticated } = useSelector(state => state.auth);
    const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [predicate, setPredicate] = useState(new Map([
        ['startDate', new Date()],
        ['filter', 'all']
    ]));

    function handleSetPredicate(key, value) {
        dispatch(clearEvents());
        setLastDocSnapshot(null);
        setPredicate( new Map(predicate.set(key, value)) );
    }

    useEffect(() => {
        setLoadingInitial(true);
        dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
            setLastDocSnapshot(lastVisible);
            setLoadingInitial(false);
        });
        return () => dispatch(clearEvents());
    }, [dispatch, predicate]);

    function handleFetchNextEvents() {
        dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(lastVisible => {
            setLastDocSnapshot(lastVisible);
        });
    }

    /* useFirestoreCollection({
        query: () => fetchEventsFromFirestore(predicate),
        data: _events => dispatch(listenToEvents(_events)),
        deps: [dispatch, predicate]
    }); */

    //if (loading) return <LoadingComponent />;

    return (
        <Grid className="event-dashboard" container>
            <Grid className="item" item md={8} sm={7} xs={12}>
                {loadingInitial &&
                    <>
                        <EventListItemSkeleton />
                        <EventListItemSkeleton />
                    </>
                }
                
                <EventList 
                    events={events} 
                    getNextEvents={handleFetchNextEvents} 
                    loading={loading} 
                    moreEvents={moreEvents}
                />
                {/* <Button 
                    style={{marginTop: 10}} 
                    disabled={!moreEvents}
                    variant="contained" 
                    color="primary" 
                    onClick={handleFetchNextEvents}
                >
                    {loading && <CircularProgress size='1.3rem' />}
                    {!loading && 'More...'}
                </Button> */}
            </Grid>
            <Grid className="item" item md={4} sm={5} xs={12}>
                { authenticated && <EventsFeed />}
                <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading}/>
            </Grid>
            <Grid item md={8} sm={7} xs={12}>
                {loading && <CircularProgress />}
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