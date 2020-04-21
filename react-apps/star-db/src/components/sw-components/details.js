import React, { Component, Fragment } from 'react';
import { withData } from '../hoc-helper';
import SwapiService from '../../services/swapi-service';
//import ItemDetails, { Record } from '../item-details';
import ItemDetails, { Record } from '../item-details/item-details';

const {
    getPerson,
    getPlanet,
    getStarship,
    getPersonImage,
    getPlanetImage,
    getStarshipImage } = new SwapiService();

const PersonDetails = ({ itemId }) => {
    return (
        <ItemDetails 
            itemId={itemId}
            getData={getPerson}
            getImageUrl={getPersonImage} 
        >
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
    );
};

const StarshipDetails = ({ itemId }) => {
    return (
        <ItemDetails 
            itemId={itemId}
            getData={getStarship}
            getImageUrl={getStarshipImage}
        >
            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="costInCredits" label="Cost in credits" />
        </ItemDetails>
    );
};

const PlanetDetails = ({ itemId }) => {
    return (
        <ItemDetails 
            itemId={itemId}
            getData={getPlanet}
            getImageUrl={getPlanetImage}
        >
            <Record field="population" label="Population" />
            <Record field="rotationPeriod" label="RotationPeriod" />
            <Record field="diameter" label="Diameter" />
        </ItemDetails>
    );
};

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
};