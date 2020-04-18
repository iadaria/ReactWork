import React, { Component } from 'react';
import RandomPlanet from '../random-planet';
import Header from '../header';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PersonDetails from '../person-details/person-details';
import ItemList from '../item-list';

import './app.css';
import PeoplePage from '../people-page/people-page';


export default class App extends Component {

    state = {
        showRandomPlanet: true,
        hasError: false,
    };

    componentDidCatch() {
        console.log('componentDidCatch');
        //Как только поймали от компонента снизу ошибку
        //Говорим у нас есть ошибка
        this.setState({hasError: true});
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet />:
            null;

        return (
            <div className="container">
                <Header />
                {planet}

                <div className="row mb2 button-row">
                    <ErrorButton />
                </div>

                <PeoplePage />
                
                <div className="row mb-3">
                    <div className="col-md-6">
                        <ItemList personSelected={this.handlePersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>

            </div>
        );
    }
}