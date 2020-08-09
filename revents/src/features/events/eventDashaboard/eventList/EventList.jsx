import React from 'react'
import EventListItem from '../eventListItem/EventListItem';

export default function EventList({ events }) {
    return (
        <>
            {events.map(event => (
                <EventListItem
                    key={event.id}
                    event={event}
                />
            ))}
        </>
    );
}
