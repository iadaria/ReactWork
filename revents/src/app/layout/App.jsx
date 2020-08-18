import './app.scss';
import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import NavBar from '../../features/nav/NavBar';
import Container from '@material-ui/core/Container';
import EventForm from '../../features/events/eventForm/EventForm';
import EventDashboard from '../../features/events/eventDashaboard';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed';
import ModalManager from '../common/modals/ModalManager';
import Sandbox from '../../features/sandbox/Sandbox';
import { ToastContainer } from 'react-toastify';
import ErrorComponent from '../common/errors/ErrorComponent';


export default function App() {
    const {key} = useLocation();

    return (
        <div className="app">
            <ModalManager />
            <ToastContainer position='bottom-right' hideProgressBar/>
            <Route exact path='/' component={HomePage} />
            <Route path={'/(.+)'} render={() => (
                <>
                    <NavBar />
                    <Container className="app-content">
                        <Route exact path='/events' component={EventDashboard} />
                        <Route path='/events/:id' component={EventDetailedPage} />
                        <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key}/>
                        <Route path='/sandbox' component={Sandbox} />
                        <Route path='/error' component={ErrorComponent} />
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

/* function handleSelectEvent(event) {
    setSelectedEvent(event);
    setFormOpen(true);
} */

/* function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(true);
} */