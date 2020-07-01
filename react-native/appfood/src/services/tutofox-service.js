import { DATA } from '../store/data';

export default class TutofoxService {
    _apiBase = "http://tutofox.com/foodapp/api.json";

    async getResource(url = "") {
        const res = await fetch(`${this._apiBase}${url}`);
        console.log('request', res.ok);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
        }
        //console.log('result request of json', await res.json());
        return await res.json();   
    }
    getAllData = async () => {
        try {
            return await this.getResource();
        } catch {
            return DATA;
        }
    }

    getAllBanners = async () => {
        const res = await this.getResource();
        return res.banner
    };

    getAllCategories = async() => {
        const res = await this.getResource();
        return res.categories;
    }
}