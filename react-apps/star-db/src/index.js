import SwapiService from './services/swapi-service.js';

const swapi = new SwapiService();

swapi.getAllPeople().then((body) => {
    console.log(body);
});

swapi.getAllPlanets().then((body) => {
    console.log(body);
});

swapi.getAllStarships().then((body) => {
    console.log(body);
});
