import React from 'react';

export default class SwapiService {

    _apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
        }
    
        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results; //name of column json
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);
        return res.results; //name of column json
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results; //name of column json
    }

    getPerson(id) {
        return this.getResource(`/people/${id}/`);
    }

    getPlanet(id) {
        return this.getResource(`/planets/${id}/`);
    }

    getStarship(id) {
        return this.getResource(`/starships/${id}/`);
    }
}