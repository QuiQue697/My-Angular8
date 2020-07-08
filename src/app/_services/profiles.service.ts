// *** Profile page *** //

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

// import { ApiService } from './api.service';
// import { Profile } from '../models';

@Injectable()
export class ProfilesService {

    // private _url: string = '../../assets/data/users.json';

   constructor(private http: HttpClient) { }

   getUsers() {
        // return this.http.get(this._url);
    }
}

//     private apiService: ApiService
//   ) {}

//   get(username: string): Observable<Profile> {


//     return this.apiService.get('/profiles/' + username)
//       .map((data: {profile: Profile}) => data.profile);
//   }
// }
