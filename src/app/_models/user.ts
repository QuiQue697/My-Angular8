import { Role } from './role';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    DateOfBirth: string;
    gender: string;
    country: string;
    state: string;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: Role;
    // token?: string; *** Modified 06/09/2020 ***
    token: string;
}

export class Admin {
    Admin: Role;
}