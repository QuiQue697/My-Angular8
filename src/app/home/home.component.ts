import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

import { HttpClient, HttpEventType, HttpClientModule } from '@angular/common/http';

@Component({
  // selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription; 
  users: User[];
  userFromApi: User;
  loading = false;
  selectedFile: File = null;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient   
    ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      // this.currentUser = x);
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllUsers();
  }

// *** Upload File or image *** //
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

  onSubmit() {
    const formData = new FormData();
    formData.append('files', this.fileData);

    this.fileUploadProgress = '0%';

    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if (events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        console.log(events.body);
        alert('SUCCESS !!');
      }
    });
  }
// *** End Upload File or image *** //


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
    this.selectedFile =  event.target.files[0] as File;
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('https://us-central-fb-cloud-function-demo.cloudfunctions.net/uploadFile', fd)  // ** * Modified; 06 / 09 / 2020 ** *
      .subscribe(res => {
        console.log(res);
      });
  }

}

