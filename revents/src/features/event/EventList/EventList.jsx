import React, { Component, Fragment } from 'react';
//import { Chip } from '@material-ui/core';
//import { format } from 'date-fns';
import EventListItem from './EventListItem';

class EventList extends Component {
    render() {
        const { events, selectEvent, deleteEvent } = this.props;
        return (
            <Fragment>
                {/* {activitiesByDate.map(([group, activities]) => ( */}
                {/* <Chip label={format(new Date(group), 'eeee do MMMM')} color="primary" style={{ marginTop: '.5em' }} /> */}
                <Fragment>
                    {events.map(event => (
                        <EventListItem
                            key={event.id}
                            event={event}
                            selectEvent={selectEvent}
                            deleteEvent={deleteEvent}
                        />
                    ))}
                </Fragment>
                {/* } */}
            </Fragment>
        )
    }
};

export default EventList;
