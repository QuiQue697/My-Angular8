import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  loading = false;
  contacts: any;
  selectedContact: any;
  users: User[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  userFromApi: User;

  // constructor(public dataService: DataService) { }

  constructor( 
    public dataService: DataService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient
    ) {
      // this.currentUser = this.authenticationService.currentUserValue;
       this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
       this.currentUser = user;
      });
    }

  ngOnInit() {
    this.loading = true;
    // this.userService.getById(this.selectedContact.id).pipe(first()).subscribe(user => {
    //     this.loading = false;
    //     this.userFromApi = user;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  deleteUser(id: number) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        //  .subscribe(users => this.users = users);
        .subscribe(users => {
          this.loading = false;
          this.users = users;
        });
  }

  public selectContact(contact) {
    this.selectedContact = contact;
  }
}
