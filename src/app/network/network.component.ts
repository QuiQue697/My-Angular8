import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  loading = false;
  currentUser: User;
  contacts;
  selectedContact;
  users: User[];
  userFromApi: User;

  // constructor(public dataService: DataService) { }

  constructor( 
    public dataService: DataService,
    private userService: UserService,
    private authenticationService: AuthenticationService,    
    private http: HttpClient
    ) { 
      this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit() {
    this.contacts = this.dataService.getContacts();   
  // }

  // ngOnInit() {
    // this.loadAllUsers();

    this.loading = true;
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
        this.loading = false;
        this.userFromApi = user;
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

  public selectContact(contact){
    this.selectedContact = contact;
  }
} 
 