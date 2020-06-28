import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers/auth.guard';

import { AdminComponent } from './admin/admin.component';
import { Role } from './_models/role';

import { NetworkComponent } from './network/network.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { SettingsComponent } from './user/profile-settings/settings.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },

  // { path: '',
  //   component: HomeComponent },

  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
  // { path: 'admin', component: AdminComponent },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users-list',
    component: UsersListComponent
  },
  {
    path: 'network',
    component: NetworkComponent
  },
  {
    path: 'friends-list',
    component: FriendsListComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },

// otherwise redirect to home
  { path: '**', redirectTo: '' },

];

// @NgModule({
//   declarations:[],
//   imports: [
//     BrowserModule,
//     RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })

export const AppRoutingModule = RouterModule.forRoot(routes);
// export class AppRoutingModule { }
