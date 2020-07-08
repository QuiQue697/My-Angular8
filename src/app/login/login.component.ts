import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';

import { UserService } from '../_services/user.service'; // *** added on 07/07/2020 *** //

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string; 
    success: string;
    user;  // *** added on 07/07/2020 *** //

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private userService: UserService  // *** added on 07/07/2020 *** //
  ) {
        // redirect to home if already logged in
          if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
     }
  ngOnInit() {
   // watch the route parameters for changes
   // every time it changes (or on first load), go get a user from userservice
    // this.route.params.subscribe(params => {  // *** added on 07/07/2020 *** //
      // const username = params['username'];
      // this.userService
      //     .getUser(username)
      //     .subscribe(user => this.user = user);

      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

    // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // show success message on registration
      if (this.route.snapshot.queryParams['registered']) {
            this.success = 'Registration successful';
        }
    }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

        // reset alerts on submit
    this.error = null;
    this.success = null;

        // stop here if form is invalid
    if (this.loginForm.invalid) {
            return;
        }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
