import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

/* import SwapiService from './services/swapi-service';

const swapi = new SwapiService();

swapi.getAllPeople().then((body) => {
    console.log(body);
}); */