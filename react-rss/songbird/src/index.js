export default class XenoCantoService {

    _apiBase = '';

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

    getBird(id) {
        return this.getResource(`/people/${id}/`);
    }
}

const xenoCanto = new XenoCantoService();
xenoCanto.getBird().then((body) => {
    console.log(body);
});