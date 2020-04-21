import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import RandomPlanet from '../random-planet';
import Header from '../header';
import ErrorBoundry from '../error-boundry';
import Row from '../row';

import './app.css';
import PeoplePage from '../people-page/people-page';
import ItemDetails, { Record } from '../item-details/item-details';


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
        const {
            getPerson, 
            getStarship, 
            getPersonImage, 
            getStarshipImage}  = this.swapiService;

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet />:
            null;

        const personDetails = (
            <ItemDetails 
                itemId={3}
                getData={getPerson}
                getImageUrl={getPersonImage} 
            >
                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />
            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails 
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}
            >
                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="costInCredits" label="Cost in credits" />
            </ItemDetails>
        );

        return (
            <ErrorBoundry>
                <div className="container">
                    <Header />
                    <PeoplePage />

                    {/* <Row
                        left={personDetails}
                        right={starshipDetails}
                    /> */}

                </div>
            </ErrorBoundry>
        );
    }
}
