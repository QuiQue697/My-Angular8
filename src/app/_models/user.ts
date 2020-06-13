import { Role } from './role';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;    
    email: string;
    // DOB: string;    
    role: Role;
    // token?: string; *** Modified 06/09/2020 ***
    token: string;
}