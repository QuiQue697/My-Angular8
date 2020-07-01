import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../_services/data.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { HttpClient } from '@angular/common/http';
// import { AlertService } from '../../_services/alert.service';






@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

// export class SettingsComponent implements OnInit {
  // settingsForm: FormGroup;
  // loading = false;
  // submitted = false;
  // returnUrl: string;
  // error = '';

  // constructor(
    //   private formBuilder: FormBuilder,
    //   private route: ActivatedRoute,
    //   private router: Router,
    //   private authenticationService: AuthenticationService,
    //   private alertService: AlertService) { 
    //       if (this.authenticationService.currentUserValue) {
    //         this.router.navigate(['/']);
    //     }
    //  }

  // ngOnInit() {
  //   this.settingsForm = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  //   // get return url from route parameters or default to '/'
  //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  // }

   // convenience getter for easy access to form fields
//   get f() { return this.settingsForm.controls; }

//   onSubmit() {
//     this.submitted = true;

//     this.alertService.clear();

//     // stop here if form is invalid
//     if (this.settingsForm.invalid) {
//         return;
//     }

//     this.loading = true;
//     this.authenticationService.login(this.f.username.value, this.f.password.value)
//         .pipe(first())
//         .subscribe(
//           data => {
//             this.router.navigate([this.returnUrl]);
//           },
//           error => {
//             this.alertService.error(error);
//             this.loading = false;
//           }
//         );
//   }

// }



export class SettingsComponent implements OnInit {
  loading = false;
  contacts: any;
  selectedContact: any;
  users: User[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  userFromApi: User;

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
