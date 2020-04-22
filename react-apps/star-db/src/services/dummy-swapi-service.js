export default class DummySwapiService {
    _people = [
        {
            id: 1,
            name: 'Bilbo Baggins [TEST DATA]',
            gender : 'male',
            birthYear: 'long ago',
            eyeColor: 'dark brown'
        },
        {
            id: 2,
            name: '2 Bilbo Baggins [TEST DATA]',
            gender : 'male',
            birthYear: '2 long ago',
            eyeColor: '2 dark brown'
        }
    ];

    _planets = [
        {
            id: 1,
            name: 'Earth [TEST DATA]',
            population: '7',
            rotationPeriod: '23 hours 46 seconds',
            diameter: '12.742 km'
        },
        {
            id: 2,
            name: '2 Earth [TEST DATA]',
            population: '7',
            rotationPeriod: '23 hours 46 seconds',
            diameter: '12.742 km'
        }
    ];

    _starships = [
        {
            id: 1,
            name: 'USS [TEST DATA]',
            model: 'NCC',
            manufacturer: 'Northrop',
            costInCredits: 'not known',
            length: 'approx 300',
            crew: 1000,
            passengers: 50,
            cargoCapacity: 1000
        },
        {
            id: 2,
            name: 'USS [TEST DATA]',
            model: 'NCC',
            manufacturer: 'Northrop',
            costInCredits: 'not known',
            length: 'approx 300',
            crew: 1000,
            passengers: 50,
            cargoCapacity: 1000
        }
    ];
    
    getAllPeople = async () => this._people;
    getPerson = async () => this._people[0];

    getAllPlanets = async () => this._planets;
    getPlanet = async () => this._planets[0];

    getAllStarships = async () => this._starships;
    getStarship = async () => this._starships[0];
}