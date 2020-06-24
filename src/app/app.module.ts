import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// *** Next two Added for File Upload ***/
// import { FileSelectDirective } from 'ng2-file-upload';
// import { FormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';

import { NetworkComponent } from './network/network.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { SettingsComponent } from './user/profile-settings/settings.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  imports: [
    BrowserModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    // FileSelectDirective,

    AlertComponent,
    NetworkComponent,
    FriendsListComponent,
    SettingsComponent,
    UsersListComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent, UploadComponent, AdminComponent,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
