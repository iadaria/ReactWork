import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import RandomPlanet from '../random-planet';
import Header from '../header';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';

export default class App extends Component {

    state = {
        selectedItem: null,
        swapiService: new SwapiService(),
    };

    handleServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            };
        });
    }

    handleItemSelected = (id) => {
        console.log('set id=' + id);
        this.setState( {
            selectedItem: id,
        });
    };

    render() {

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <Router>
                        <div className="container">
                            <Header serviceChange={this.handleServiceChange}/>

                            <ErrorBoundry>
                                <RandomPlanet />
                            </ErrorBoundry>

                            <Route 
                                path="/" 
                                render={() => <h2>Welcome to StarDB</h2>} 
                                exact/>
                            <Route path="/people" render={() => <h2>People</h2>} exact />
                            <Route path="/people" component = {PeoplePage} />
                            <Route path="/planets" component = {PlanetsPage} />
                            <Route path="/starships" component = {StarshipsPage} />

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
