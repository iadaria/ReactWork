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
            <div className="random-planet">
                
            </div>
        );
    };
}

export default RandomPlanet;