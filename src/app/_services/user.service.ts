import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { User } from '../_models/user';
// import { EmailValidator } from '@angular/forms';


@Injectable({ providedIn: 'root' })

export class UserService {
    // apiBaseURL: string;  // *** disabled 06/27/2020 ***
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
        // return this.http.get<User[]>(`/users`); // *** Modified 06/09/2020 ***
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
        // return this.http.post(`/users/register`, user);  *** Modified 06/09/2020 ***
    }


    // authenticate(user: User) {  // *** Modified 06/19/2020 ***
    //     return this.http.post<any>(this.apiBaseURL + 'users/authenticate', { email, password } );
    // }

    // updates(user: User) { *** Modified 06/19/2020 ***
    //     return this.http.put(this.apiBaseURL + 'users/', updateUser.id, updateUser);
    // }

    // userphotoid(user: User) { *** Modified 06/19/2020 ***
    //     return this.http.post(this.apiBaseURL + 'users/updatephotoId', updateUser);
    // }

    // post(user: User) { *** Modified 06/19/2020 ***
    //     return this.http.post<Post>(this.apiBaseURL + 'posts/creates', updateUser);
    // }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
        // return this.http.delete(`/users/${id}`);  *** Modified 06/09/2020 ***
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);

    }

}

