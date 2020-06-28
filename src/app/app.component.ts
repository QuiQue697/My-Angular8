import { Component, OnInit, Directive } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
// import { Role } from './_models/role';

// import { HttpClientModule } from '@angular/common/http';

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

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x =>
        this.currentUser = x);
    }

    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}

export class ImageUploadWithPreviewComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
      this.fileData = fileInput.target.files[0] as File;
      this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  // onSubmit() {
  //     const formData = new FormData();
  //     formData.append('file', this.fileData);
  //     this.http.post('url/to/your/api', formData)
  //       .subscribe(res => {
  //         console.log(res);
  //         this.uploadedFilePath = res.data.filePath;
  //         alert('SUCCESS !!');
  //       })
  // }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('files', this.fileData);

  //   this.fileUploadProgress = '0%';

  //   this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  //   .subscribe(events => {
  //     if (events.type === HttpEventType.UploadProgress) {
  //       this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
  //       console.log(this.fileUploadProgress);
  //     } else if (events.type === HttpEventType.Response) {
  //       this.fileUploadProgress = '';
  //       console.log(events.body);
  //       alert('SUCCESS !!');
  //     }

  //   });
  // }
}


