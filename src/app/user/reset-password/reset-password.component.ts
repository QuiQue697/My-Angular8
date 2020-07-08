import { Component, OnInit } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  // constructor() { }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
    ) {
        if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/reset-password']);
      }
    }
  //   private loginService: LoginService
  // ) {
  //     this._createForm();
  //   }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      matchPassword: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

  }
  // convenience getter for easy access to form fields
  get f() { return this.resetPasswordForm.controls; }


  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.newPassword.value, this.f.matchPassword.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Password Changed successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
  }

}
