import './app.scss';
import React, { useState, useEffect } from 'react';
import EventDashboard from '../../features/events/eventDashaboard';
import NavBar from '../../features/navBar/NavBar';
import Container from '@material-ui/core/Container';

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
            <NavBar setFormOpen={handleCreateFormOpen}/>
            <Container className="app-content">
                <EventDashboard 
                    formOpen={formOpen} 
                    setFormOpen={setFormOpen} 
                    selectEvent={handleSelectEvent}
                    selectedEvent={selectedEvent}               
                />
            </Container>
        </div>
    );
}
/*
    import logo from './logo.svg';
    <img src={logo} className="App-logo" alt="logo" /> 
*/