import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import RandomPlanet from '../random-planet';
import Header from '../header';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
//import DummySwapiService from '../../services/dummy-swapi-service';
//import ItemList from '../item-list';

import './app.css';

import {
    PersonList,
    PlanetList,
    StarshipList,
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
} from '../sw-components';

export default class App extends Component {
    swapiService = new SwapiService();
    state = {
        showRandomPlanet: true,
        selectedItem: null,
    };

    handleItemSelected = (id) => {
        console.log('set id=' + id);
        this.setState( {
            selectedItem: id,
        });
    };

    render() {
        const planet = this.state.showRandomPlanet ?
            <RandomPlanet />:
            null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService} >
                    <div className="container">
                        <Header />

                        {/* <PersonDetails itemId={11} />

                        <PlanetDetails itemId={2} />

                        <StarshipDetails itemId={5} /> */}

                        <PersonList />
                        
                        <StarshipList />

                        <PlanetList />

                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
