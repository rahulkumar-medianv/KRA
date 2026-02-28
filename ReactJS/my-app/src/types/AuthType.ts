export interface User {
    userId: string;
    name?: string;
    email: string;
    password: string;
}

export interface Profile {
    userId: string;
    name: string;
    email: string;
}