import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { environment } from '../environments/environment';
import { User } from '../_models/user';

// const BASEURL = 'http://localhost:3000/api/resetpassword';  // *** Reset Password 07/02/2020 *** //
@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

  // *** Reset Password 07/02/2020 *** //
    // registerUser(body): Observable<any> {
    //     return this.http.post(`${BASEURL}/register`, body);
    //   }

    //   loginUser(body): Observable<any> {
    //     return this.http.post(`${BASEURL}/login`, body);
    //   }

    //   requestReset(body): Observable<any> {
    //     return this.http.post(`${BASEURL}/req-reset-password`, body);
    //   }

    //   newPassword(body): Observable<any> {
    //     return this.http.post(`${BASEURL}/new-password`, body);
    //   }

    //   ValidPasswordToken(body): Observable<any> {
    //     return this.http.post(`${BASEURL}/valid-password-token`, body);
    //   }
  // *** End Reset Password 07/02/2020 *** //

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    // login(username, password) {
    login(username: string, password: string) {
        // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password }) *** Modified 06/09/2020 ***
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}