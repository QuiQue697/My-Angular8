import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

import { HttpClient, HttpEventType, HttpClientModule } from '@angular/common/http';

// import { FormArray, FormControl } from '@angular/forms'; // *** added for textarea 07/07/2020 ***//

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

  // *** added line 28 to 33 for textarea 07/07/2020 ***//
  // textArea: FormControl = new FormControl('');
  // formArray: FormArray;
  // tags: any;
// array to hold prev changes, which is used to avoid stack size exceeded error
// as this is cyclic behavior
  // formArrayChanges: string[] = [];

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
      // this.formArray = new FormArray([]); // *** added for textarea 07/07/2020 ***//
  }

  ngOnInit() {
    this.loadAllUsers();
  }

// *** Upload File or image *** //
  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();

// *** added line 62 to 85 for textarea 07/07/2020 ***//
    // this.textArea.valueChanges.subscribe((textBodyText: string) => {
    //   const regex = /[$][{][1-9][0-9]*[:][a-zA-Z0-9 ]{0,}[}]/g;
    //   const foundStrings = textBodyText.match(regex) || [];

    //   this.tags = new Object();
    //   let match;

    //   // tslint:disable-next-line: no-conditional-assignment
    //   while ((match = regex.exec(textBodyText)) != null) {
    //     this.tags[match.index] = match[0];
    //   }
    //   // clear saved array
    //   this.formArray.clear();

    //   foundStrings.map(str => {
    //     // get id and value of control
    //     const id = str.substring(2, str.indexOf(':'));
    //     const value = str.substring(str.indexOf(':') + 1, str.indexOf('}'));

    //     this.formArray.push(new FormControl(value));
    //   });
    // });

    // this.textArea.setValue('${1:scan1}\n${1:scan1}\n${2:scan2}\n${3:scan3}');
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

