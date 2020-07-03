import React, { Component } from 'react';
import './event-dashboard.sass';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { events } from './events';
import cuid from 'cuid';


class EventDashboard extends Component {
    state = {
        events: events,
        isOpen: false,
        selectedEvent: null
    };

    handleUpdateEvent = (updatedEvent) => {
        console.log('updated event', updatedEvent);
        console.log('old state', this.state);

        this.setState(({events}) => ({
            events: events.map(event => {
                if (event.id === updatedEvent.id) {
                    return {...event, ...updatedEvent};
                }
                return event;
            }),
            isOpen: false,
            selectedEvent: null
        }));
        console.log('new state', this.state);
    }

    handleCreateFormOpen = () => {
        this.setState({
            isOpen: true,
            selectedEvent: null,
        });
    };

    handleFormCancel = () => {
        this.setState({
            isOpen: false,
        });
    };

    handleDeleteEvent = (id) => {
        this.setState(({events}) => ({
            events: events.filter(e => e.id !== id)
        }));
    };

    handleCreateEvent = (newEvent) => {
        newEvent.id = cuid();
        newEvent.hostPhotoURL = '/assets/user.png';
        this.setState(({ events }) => ({
            events: [...events, newEvent],
            isOpen: false
        }));
    };

    handleSelectEvent = (event) => {
        //console.log('select event' , event);
        this.setState({
            selectedEvent: event,
            isOpen: true
        })
    }

    render() {
        const { events, isOpen, selectedEvent } = this.state;
        return (
            <Grid className="event-dashboard" container spacing={3}>
                <Grid item md={8} sm={6} xs={12} style={{ position: 'relative' }}>
                    <EventList 
                        events={events} 
                        selectEvent={this.handleSelectEvent} 
                        deleteEvent={this.handleDeleteEvent}
                    />
                </Grid>
                <Grid className="filter" item md={4} sm={6} xs={12}>
                    <Button
                        className="btn-success"
                        //onClick={this.handleIsOpenToggle}
                        //omponent={NavLink} to='/createActivity'
                        onClick={this.handleCreateFormOpen}
                        color="inherit"
                    >
                        Create event
                    </Button>
                    {isOpen && (
                        <EventForm
                            //!!without prop key our form don't update
                            key={selectedEvent ? selectedEvent.id : 0}
                            updateEvent={this.handleUpdateEvent}
                            selectedEvent={selectedEvent}
                            createEvent={this.handleCreateEvent}
                            cancelFormOpen={this.handleFormCancel}
                        />
                    )}
                </Grid>

            </Grid>
        )
    }
};

export default EventDashboard;