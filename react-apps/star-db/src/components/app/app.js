import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import RandomPlanet from '../random-planet';
import Header from '../header';
import ErrorBoundry from '../error-boundry';
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
                <div className="container">
                    <Header />

                    <PersonDetails itemId={11} />

                    <PlanetDetails itemId={2} />

                    <StarshipDetails itemId={5} />

                    <PersonList >
                        { ({name}) => <span>{name}</span>}
                    </PersonList>
                    
                    <StarshipList >
                        { ({name}) => <span>{name}</span>}
                    </StarshipList>

                    <PlanetList >
                        { ({name}) => <span>{name}</span>}
                    </PlanetList>
                    {/* <PersonDetails /> */}

                </div>
            </ErrorBoundry>
        );
    }
}
