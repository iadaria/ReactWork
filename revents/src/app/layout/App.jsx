import './app.scss';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import NavBar from '../../features/navBar/NavBar';
import Container from '@material-ui/core/Container';
import EventForm from '../../features/events/eventForm/EventForm';
import EventDashboard from '../../features/events/eventDashaboard';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed';


export default function App() {
    const [formOpen, setFormOpen] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        console.log('selectedEvent', selectedEvent);
    })

    function handleSelectEvent(event) {
        setSelectedEvent(event);
        setFormOpen(true);
    }

    function handleCreateFormOpen() {
        setSelectedEvent(null);
        setFormOpen(true);
    }

    return (
        <div className="app">
            <Route exact path='/' component={HomePage} />
            <Route path={'/(.+)'} render={() => (
                <>
                    <NavBar setFormOpen={handleCreateFormOpen} />
                    <Container className="app-content">
                        <Route exact path='/events' component={EventDashboard} />
                        <Route path='/events/:id' component={EventDetailedPage} />
                        <Route path='/createEvent' component={EventForm} />
                        {/* <EventDashboard 
                    formOpen={formOpen} 
                    setFormOpen={setFormOpen} 
                    selectEvent={handleSelectEvent}
                    selectedEvent={selectedEvent}               
                /> */}
                    </Container>
                </>
            )} />
        </div>
    );
}
/*
    import logo from './logo.svg';
    <img src={logo} className="App-logo" alt="logo" />
*/