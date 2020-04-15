import React from 'react';
import RandomPlanet from '../random-planet';
import Header from '../header';
import PersonDetails from '../person-details/person-details';
import ItemList from '../item-list';

import './app.css';

const App = () => {
    return (
        <div className="app.css">
            <Header />
            <RandomPlanet />

            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList />
                </div>
                <div className="col-md-6">
                    <PersonDetails />
                </div>
            </div>
        </div>
    );
};

export default App;

