export interface Users {
    _id?: string;
    name?: string;
    email: string;
    password?: string;
    role?: number; // can make a catalog of roles so that it is not a string
    location?: number;
    biography?: string;
    image?: string;
    status?: number;
    // TODO token is comming somehow check JWT format
}
