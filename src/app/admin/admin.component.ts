import { Component, OnInit, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User,  } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'admin.component.html' })

export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];
    currentUser: User;
    currentUserSubscription: Subscription;


     constructor(
          private authenticationService: AuthenticationService,
          private userService: UserService,  // *** MDisabled on 06/26/2020
         ) {

           this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
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
