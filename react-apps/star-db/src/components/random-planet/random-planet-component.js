import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {
    static defaultProps = {
        updateInterval: 10000
    };

    static propTypes = {
        updateInterval: PropTypes.number
    };

    /* static propTypes = {
        updateInterval: (props, propName, componentName) => {
            const value = props[propName];

            if (typeof value === 'number' && !isNaN(value)) {
                return null;
            }

            return new TypeError(`${componentName}: ${propName} must be number`);
        }
    };
    */
    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        const { updateInterval } = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
    }

    componentWillMount = () => clearInterval(this.interval);

    onPlanetLoaded = planet => 
        this.setState({ 
            planet,
            loading: false,
            error: false,
        });

    onError = error => this.setState({ error: true, loading: false });

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    render() {
        const { planet, loading, error } = this.state;

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
}

/* RandomPlanet.defaultProps = {
    updateInterval: 10000
} */

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