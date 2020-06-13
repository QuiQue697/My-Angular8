import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service'
import { User } from './_models/user'
import { Role } from './_models/role';

// import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  currentUser: User;
  // title = 'Friends Book';
  // public name = "QuiQue";  *** Disabled 06/10/2020 ***

  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService 
    ) {
        this.authenticationService.currentUser.subscribe(x => 
        this.currentUser = x);
  }

//   get isAdmin() {   *** Disabled 06/10/2020 ***
//     return this.currentUser && this.currentUser.role === Role.Admin;
// }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}