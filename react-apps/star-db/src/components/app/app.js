import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import RandomPlanet from '../random-planet';
import Header from '../header';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage } from '../pages';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './app.css';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    handleServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            };
        });
    };

    onLogin = () => this.setState({isLoggedIn: true});

    render() {

        const { isLoggedIn } = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
    
                    <Router>
                        <div className="container">
                            <Header serviceChange={this.handleServiceChange}/>

                            <ErrorBoundry>
                                <RandomPlanet />
                            </ErrorBoundry>

                            <Switch>
                                <Route 
                                    path="/" 
                                    render={() => <h2>Welcome to StarDB</h2>} 
                                    exact/>

                                {/* <Route path="/people" render={() => <h2>People</h2>} exact /> */}
                                <Route path="/people/:id?" component={PeoplePage} />

                                <Route path="/planets" component={PlanetsPage} />

                                <Route path="/starships" exact component={StarshipsPage} />
                                <Route path="/starships/:id" 
                                    render={({match, location, history}) => {
                                        const { id } = match.params;
                                        //console.log(match); console.log(location); console.log(history);
                                        return <StarshipDetails itemId={id}/>
                                    }} 
                                />

                                <Route 
                                    path="/login"
                                    render={() => (
                                        <LoginPage 
                                            isLoggedIn={isLoggedIn}
                                            onLogin={this.onLogin}/>
                                    )} />

                                <Route 
                                    path="/secret"
                                    render={() => (
                                        <SecretPage isLoggedIn={isLoggedIn}/>
                                    )} />

                                {/* <Redirect to="/" /> */}
                                
                                <Route render={() => <h2>Page not found</h2>}/>

                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}