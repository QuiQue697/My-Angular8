import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

import { HttpClient } from '@angular/common/http';  // *** Disabled 06/10/2020 ***
// import { Router } from '@angular/router';

@Component({
  // selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})

export class HomeComponent implements OnInit, OnDestroy {  
  currentUser: User;
  currentUserSubscription: Subscription; // *** Modified 06/09/2020 ***//
  users: User[];
  userFromApi: User;
  loading = false;
  selectedFile: File = null;

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
    this.loadAllUsers();
    // this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
    // this.loading = false;
    // this.userFromApi = user;
    // });

  // Trying to implement the userImage with userName
    //  this.users = [
  //    username : 'friend-01',
  //    userImage : '../assets/friend-01.png'
  //  ]

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}

  deleteUser(id: number) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => 
        this.loadAllUsers());
}

private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        //  .subscribe(users => this.users = users);
        .subscribe(users => {
          // this.loading = false;  *** Modified 06/09/2020 ***
          this.users = users;
        });
}

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    // this.http.post('https://us-central-fb-cloud-function-demo.cloudfunctions.net/uploadFile', fd)   *** Modified 06/09/2020 ***
      // .subscribe(res => {
        // console.log(res);
      // });
  }

}

