import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User,  } from '../_models/user';
import { Admin } from '../_models/role';  // *** Modified 2020/06/21 *** //
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {

    loading = false;
    admin: Admin;
    users: User[] = [];
    currentUser: Admin;
    currentUserSubscription: Subscription;

    // constructor(private userService: UserService) { }

    constructor(
        // private router: Router,  // *** Added Jun 9, 2020 ***
        private authenticationService: AuthenticationService,
        private userService: UserService,
        // private http: HttpClient    *** Disabled 06/10/2020 ***
        ) {
          // this.currentUser = this.authenticationService.currentUserValue; *** Modified Jun 9, 2020 ***
          this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          // this.authenticationService.currentUser.subscribe(x => *** Modified Jun 9, 2020 ***
          // this.currentUser = x);
          this.currentUser = user;
        });
      }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}
