import React, { Fragment } from 'react';
//import logo from './logo.svg';
import './App.sass';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from '@material-ui/core';

function App() {
    return (
        <Fragment>
            <NavBar />
            <Container className="main" >
                <EventDashboard />
            </Container>
        </Fragment>
    );
}

export default App;
