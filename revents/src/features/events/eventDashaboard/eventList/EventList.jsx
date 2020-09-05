import React from 'react'
import EventListItem from '../eventListItem/EventListItem';
import InfiniteScroll from 'react-infinite-scroller';

export default function EventList({ events, getNextEvents, loading, moreEvents }) {
    return (
        <>
        {events.length !== 0 && (
            <InfiniteScroll
                pageStart={0}
                loadMore={getNextEvents}
                hasMore={!loading && moreEvents}
                initialLoad={false}
            >
                {events.map(event => (
                    <EventListItem
                        key={event.id}
                        event={event}
                    />
                ))}
            </InfiniteScroll>
        )}
        </>
    );
}
