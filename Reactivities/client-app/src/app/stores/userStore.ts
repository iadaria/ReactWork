import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from '../..';

export default class UserStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;
    @observable loading = false;

    @computed get isLoggedIn() { return !! this.user }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            })
            //console.log(user);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities');
        } catch (error) {
            //console.log(error);
            throw error; //to catch in login form
        }
    };

    @action getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            });
        }
        catch(error) { console.log(error); }
    };

    @action logout = () => {
        //this.rootStore.commonStore.setToken(null);
        this.rootStore.commonStore.unsetToken();
        this.user = null;
        history.push('/');
    };

    @action register = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities');
        } catch (error) {
            throw error;
        }
    };

    @action fbLogin = async (response: any) => {
        this.loading = true;
        try {
            const user = await agent.User.fbLogin(response.accessToken);
            runInAction(() => {
                this.user = user;
                this.rootStore.commonStore.setToken(user.token);
                this.rootStore.modalStore.closeModal();
            });
            history.push('/activities');
        } catch(error) {
            throw error;
        } finally { runInAction(() => { this.loading = false; });}
    };
}