import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService) {

    // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }

    ngOnInit() {
      this.forgotPasswordForm = this.formBuilder.group({
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
    }

  // convenience getter for easy access to form fields
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

  // reset alerts on submit
    this.alertService.clear();  // *** Disabled 06/10/2020 *** //

  // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.forgotPasswordForm.value)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/reset-password']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }
