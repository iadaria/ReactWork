import './app.scss';
import React, { useState } from 'react';
import EventDashboard from '../../features/events/eventDashaboard';
import NavBar from '../../features/navBar/NavBar';
import Container from '@material-ui/core/Container';

export default function App() {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <div className="app">
            <NavBar setFormOpen={setFormOpen}/>
            <Container className="app-content">
                <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen}/>
            </Container>
        </div>
    );
}
/*
    import logo from './logo.svg';
    <img src={logo} className="App-logo" alt="logo" /> 
*/