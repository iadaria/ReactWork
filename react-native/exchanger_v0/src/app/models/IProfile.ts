export interface IProfile {
    id: string,
    displayName: string,
    createdAt: Date,
    description: string,
    email: string | null,
    photoURL: string | null,
    phoneNumber: string | null,
    rating: number,
    like: number,
    dislike: number,
}

export const DefaultProfileValues: IProfile = {
    id: "",
    displayName: "",
    createdAt: new Date(0),
    description: "",
    email: null,
    photoURL: null,
    phoneNumber: null,
    rating: 0,
    like: 0,
    dislike: 0,
};