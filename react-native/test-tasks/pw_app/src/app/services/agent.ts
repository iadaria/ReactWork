import axios, { AxiosResponse } from "axios";
import { IUser, IUserFormValues } from "../models/user";

axios.defaults.baseURL = 'http://192.168.1.82:3001';

axios.interceptors.request.use((config) => {
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(undefined, error => {

    console.log("[agen]", error);

    throw error.response;
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody)
};

const User = {
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/users`, user),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/sessions/create`, user),
    current: (): Promise<IUser> => requests.get(`/api/protected/user-info`),
    list: (user: IUserFormValues): Promise<IUser[]> => requests.post(`/api/protected/users/list`, user)
};

/* const Transactions = {
    get: ()
} */

export {
    User
};