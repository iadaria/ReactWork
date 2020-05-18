import { RootStore } from "./rootStore";
import { observable, action, reaction } from "mobx";

export default class CommonStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.token, //what we observer
            token => { //what will we do
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    @action setToken = (token: string | null) => {
        //window.localStorage.setItem('jwt', token!);
        this.token = token;
    };


    @action unsetToken = () => {
        //window.localStorage.removeItem('jwt');
        this.token = null;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    };
}