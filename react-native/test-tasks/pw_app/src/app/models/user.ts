export interface IUser {
    username: string;
    //token: string;
    email: string;
    password: string;
    balance: number;
}

export interface IUserFormValues {
    email: string;
    password: string;
    //displayName?: string;
    username?: string;
}

export interface IUserInfo {
    id: string,
    username: string,
    email: string,
    balance: number
}