export interface IUser {
    username: string;
    displayName: string;
    token: string;
    image?: string;
}

export interface IUserFormValues {
    email: string;
    passsword: string;
    displayName?: string;
    username?: string;
    
}