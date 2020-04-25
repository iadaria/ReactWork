import React, { Fragment, useState } from 'react';
//import PropTypes from 'prop-types';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';


const RandomPlanet = ( { updateInterval }) => {
    const [planet, setPlanet] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    //const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
        <div className="random-planet jumbotron rounded">
            {errorMessage}
            {spinner}
            {content} 
        </div>
    );
};

export default RandomPlanet;


const PlanetView = ({ planet }) => {
    
    const { 
        id, name, population, rotationPeriod, diameter,
    } = planet;

    return (
        <Fragment>
            <img className="planet-image" 
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                alt="planet"
            />
            <div className="planet-caption">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}