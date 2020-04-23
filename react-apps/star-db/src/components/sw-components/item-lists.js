import React from 'react';
import { withData, withSwapiService, withChildFunction, compose } from '../hoc-helper';
import ItemList from '../item-list';


const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ name, model }) => <span>{name} ({model})</span>;

const PersonList = compose(
    withSwapiService(swapiService => { return {getData: swapiService.getAllPeople} }),
    withData,
    withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
    withSwapiService(swapiService => { return { getData: swapiService.getAllPlanets} }),
    withData,
    withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
    withSwapiService(swapiService => { return { getData: swapiService.getAllStarships} }),
    withData,
    withChildFunction(renderModelAndName)
)(ItemList);
    
/* const PersonList = withSwapiService
    (swapiService => { return {getData: swapiService.getAllPeople} })
    (withData(withChildFunction(renderName)(ItemList)));

const PlanetList = withSwapiService
    (swapiService => { return { getData: swapiService.getAllPlanets} })
    (withData(withChildFunction(renderName)(ItemList)));

const StarshipList = withSwapiService
    (swapiService => { return { getData: swapiService.getAllStarships} })
    (withData(withChildFunction(renderModelAndName)(ItemList))); */

export {
    PersonList,
    PlanetList,
    StarshipList
};