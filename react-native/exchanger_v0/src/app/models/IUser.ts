export interface IUser {
    uid: string | null,
    displayName: string,
    providerDisplayName: string,
    email: string | null,
    photoURL: string | null,
    phoneNumber: string | null,
    rating: number,
    like: number,
    dislike: number,
    
    providerId: string | null,
}

export const DefaultUserValues: IUser = {
    uid: null,
    displayName: "",
    providerDisplayName: "",
    email: null,
    photoURL: null,
    phoneNumber: null,
    rating: 0,
    like: 0,
    dislike: 0,

    providerId: null
};