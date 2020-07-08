import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DataService } from '../../_services/data.service';
import { Subscription } from 'rxjs';

import { AlertService } from '../../_services/alert.service';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  loading = false;
  submitted = false;

  contacts: any;
  selectedContact: any;
  users: User[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  userFromApi: User;
  alertService: any;

constructor(
  public dataService: DataService,
  private formBuilder: FormBuilder,
  private router: Router,
  private authenticationService: AuthenticationService,
  private userService: UserService,
  // private httpClient: HttpClient,
  private http: HttpClient,
  ) {
    // this.currentUser = this.authenticationService.currentUserValue;
     this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
     this.currentUser = user;
    });
  }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
    this.loading = true;
    // this.userService.getById(this.selectedContact.id).pipe(first()).subscribe(user => {
    //     this.loading = false;
    //     this.userFromApi = user;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  onSubmit() {
    this.submitted = true;

  // reset alerts on submit
   this.alertService.clear();  // *** Disabled 06/10/2020 ***

  // stop here if form is invalid
    if (this.settingsForm.invalid) {
      return;
  }

    this.loading = true;
    this.userService.register(this.settingsForm.value)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
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
