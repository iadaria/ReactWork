import React, { Component } from 'react';
import { withData, withSwapiService } from '../hoc-helper';
import ItemList from '../item-list';

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    };
}

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ name, model }) => <span>{name} ({model})</span>;

const PersonList = withSwapiService(
    withData(withChildFunction(ItemList, renderName)),
    (swapiService) => { return { getData: swapiService.getAllPeople } }
);

const PlanetList = withSwapiService(
    withData(withChildFunction(ItemList, renderName)),
    (swapiService) => { return { getData: swapiService.getAllPlanets} }
);

const StarshipList = withSwapiService(
    withData(withChildFunction(ItemList, renderModelAndName)),
    (swapiService) => { return { getData: swapiService.getAllStarships} }
);

export {
    PersonList,
    PlanetList,
    StarshipList
};