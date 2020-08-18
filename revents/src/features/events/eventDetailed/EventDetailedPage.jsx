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
import { listenToEvents } from '../eventActions';
import { Redirect } from 'react-router-dom';

export default function EventDetailedPage({ match }) {
    const dispatch = useDispatch();
    const event = useSelector(state => 
        state.event.events.find(e => e.id === match.params.id)
    );
    const { loading, error } = useSelector((state) => state.async);

    useFirestoreDoc({
        query: () => listenToEventFromFirestore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    });

    if (loading || (!event && !error)) return <LoadingComponent content="Loading event ..."/>;
    else if (error) return <Redirect to='/error' />

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
