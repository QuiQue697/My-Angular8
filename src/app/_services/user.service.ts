import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { environment } from '../environments/environment'
import { User } from '../_models/user'


@Injectable({ providedIn: 'root' })

export class UserService {
    // delete(id: number) {
    //   throw new Error("Method not implemented.");
    // }
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);  
        // return this.http.get<User[]>(`/users`); *** Modified 06/09/2020 ***
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
        // return this.http.post(`/users/register`, user);  *** Modified 06/09/2020 ***
    }
    
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
        // return this.http.delete(`/users/${id}`);  *** Modified 06/09/2020 ***
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);  

    }
}