export type Users = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    isAactive: boolean;
    address?: Address;
    refreshToken?: string | null;
    role: Role

}

export type Address = {
    city: string;
    state: string;
    country: string;
    pincode: number;
    location: string;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    CONTENT_MANAGER = 'CONTENT_MANAGER'

}