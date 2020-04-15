import React, { Component } from 'react';

import './random-planet.css';

class RandomPlanet extends Component {


    state = {
        name: null,
        populsation: null,
        rotationPeriod: null,
        diameter: null,
    };

    render() {

        const { 
            name,
            populsation,
            rotationPeriod,
            diameter
        } = this.state;

        return (
            <div className="random-planet jumbotron rounded">
                <img className="planet-image" 
                     src="https://starwars-visualguide.com/assets/img/planets/5.jpg"
                />
                
            </div>
        );
    };
}

export default RandomPlanet;