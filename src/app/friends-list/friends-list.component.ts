import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
// import { Admin } from '../_models/role';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  contacts: any;
  selectedContact: any;
  loading = false;
  users: User[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;

  // constructor(public dataService: DataService) { }
    // ngOnInit() {
    //   this.contacts = this.dataService.getContacts();
    // }
  // public selectContact(contact){
  //   this.selectedContact = contact;
  //  this.contacts = this.dataService.getContacts();
  // }
  // public selectContact(contact){
  //   this.selectedContact = contact;
  // }

  constructor(
    public dataService: DataService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
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
