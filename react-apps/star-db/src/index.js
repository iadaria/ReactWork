

const swapi = new SwapiService();

swapi.getAllPeople().then((body) => {
    console.log(body);
});