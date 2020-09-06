import './event-detailed.scss';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import LoadingComponent from '../../../app/common/components/LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
//import { listenToEvents } from '../eventActions';
import { Redirect } from 'react-router-dom';
import { listenToSelectedEvent } from '../eventActions';

export default function EventDetailedPage({ match }) {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.auth);
    const event = useSelector(state => 
        state.event.selectedEvent
        //state.event.events.find(e => e.id === match.params.id)
    );
    const { loading, error } = useSelector((state) => state.async);

    useFirestoreDoc({
        query: () => listenToEventFromFirestore(match.params.id),
        //data: _event => dispatch(listenToEvents([_event])),
        data: _event => dispatch(listenToSelectedEvent(_event)),
        deps: [match.params.id, dispatch]
    });

    const isHost = currentUser?.uid === event?.hostUid; //default false
    const isGoing = event?.attendees?.some(attendee => attendee.id === currentUser?.uid);

    if (loading || (!event && !error)) return <LoadingComponent content="Loading event ..."/>;
    else if (error) return <Redirect to='/error' />

    return (
        <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
                <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost}/>
                <EventDetailedInfo event={event}/>
                <EventDetailedChat eventId={event.id}/>
            </Grid>
            <Grid item md={4} xs={12}>
                <EventDetailedSidebar attendees={event?.attendees} hostUid={event.hostUid}/>
            </Grid>
        </Grid>
    );
};
