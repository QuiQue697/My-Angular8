import { Injectable } from '@angular/core'; 
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'; 
import { Observable } from 'rxjs';

// import { environment } from '../environments/environment';
import { AuthenticationService } from '../_services/authentication.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue; // *** Modified 06/09/2020 *** 
        if (currentUser && currentUser.token) { 

        // add auth header with jwt if user is logged in and request is to api url
            // const currentUser = this.authenticationService.currentUserValue;   *** Modified 06/09/2020 *** 
            // const isLoggedIn = currentUser && currentUser.token;
            // const isApiUrl = request.url.startsWith(environment.apiUrl);
            // if (isLoggedIn && isApiUrl) {
                request = request.clone({
                    setHeaders: { 
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            }
            return next.handle(request);
        //  } //*** Modified 06/04/2020 *** 
    }
}