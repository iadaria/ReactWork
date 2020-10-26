export interface IUserInfo {
    id: string,
    username: string,
    email: string,
    balance: number
}

export interface IUserFormValues {
    email: string;
    password: string;
    username?: string;
}


export interface IAuthResult {
    id_token?: string;
    success: boolean;
    error?: string;
}