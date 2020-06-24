import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
// import { Role } from './_models/role';

// import { environment } from './../environments/environment';


// import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
// import { constructor } from 'jasmine';

// const URL = 'http://localhost:4000/api/upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  // title = 'Friends Book';
  // public name = "QuiQue";  *** Disabled 06/10/2020 ***
  // *** Code below Added on 2020/06/21 *** //
  // title = 'ng8fileupload';
  // public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  // ngOnInit() {
  //   this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  //   this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  //        console.log('ImageUpload:uploaded:', item, status, response);
  //        alert('File uploaded successfully');
  //   };
//  }


    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => 
        this.currentUser = x);
  }

//   get isAdmin() {   *** Disabled 06/10/2020 ***
//     return this.currentUser && this.currentUser.role === Role.Admin;
// }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

