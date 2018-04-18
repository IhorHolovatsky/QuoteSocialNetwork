import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';

import { UserService } from '../../services/user.service';
import { Constants } from '../../shared/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})


export class AccountDetailsComponent implements OnInit, OnDestroy {

  userProfileForm: FormGroup;
  userProfileModel = {
    displayName: '',
    photo: null,
    photoURL: '',
    phoneNumber: '',
    id: ''
  };
  userProfile: firebase.UserInfo;

  errorMessageResources = Constants.ERROR_MESSAGE_RESOURCES;
  hasNotInternalAccount = false;

  private user: firebase.User;
  private subscriptions: Subscription[] = new Array<Subscription>();
  private firebaseStorage;
  private SAVED_CHANGES_MESSAGE;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private firebase: AngularFireAuth,
    private toastService: MzToastService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.user = this.firebase.auth.currentUser;
    this.userProfile = this.firebase.auth.currentUser.providerData.find(provider => provider.providerId === 'password');
    this.mapUserProfile(this.userProfile);
    this.hasNotInternalAccount = !this.userProfile;

    this.subscriptions.push(
      this.firebase.authState.subscribe(
        user => {
          this.user = user;
          this.userProfile = this.firebase.auth.currentUser.providerData.find(provider => provider.providerId === 'password');
          this.mapUserProfile(this.userProfile);
        }
      ),
      this.translateService.get('alerts.savedChanges').subscribe(t => {
          this.SAVED_CHANGES_MESSAGE = t;
      })
    );
    console.dir(this.user);
    this.buildForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  buildForm() {
    this.userProfileForm = this.formBuilder.group(
      {
        displayName: [this.userProfileModel.displayName, Validators.compose([Validators.required])],
        photo: [this.userProfileModel.photo],
        photoURL: [this.userProfileModel.photoURL]
      }
    );

    this.userProfileModel.id = this.user.uid;
  }

  saveUserProfile() {
    this.userProfileModel.displayName = this.userProfileForm.value.displayName;
    if (this.userProfileModel.displayName) {

      let uploadPhotoPromise: Promise<any> = new Promise<any>((resolve, reject) => { resolve(false); });

      // upload photo to storage if exists
      if (this.userProfileModel.photo) {
        const storageRef = firebase.storage().ref();
        const path = `/images/${this.user.uid}/profile-picture.png`;
        const iRef = storageRef.child(path);
        uploadPhotoPromise = iRef.put(this.userProfileModel.photo)
                              .then((snapshot) => {
                                console.dir(snapshot);
                                return snapshot;
                              })
                              .catch(error => {
                                this.handleError(error);
                              });
      }

      uploadPhotoPromise.then(snapshot => {
          if (snapshot) {
            this.userProfileModel.photoURL = snapshot.downloadURL;
          }
          this.user.updateProfile(this.userProfileModel)
                    .then(result => {
                      this.toastService.show(this.SAVED_CHANGES_MESSAGE,
                                            4000,
                                            'green');
                    })
                    .catch(error => {
                      this.handleError(error);
                    });

          this.userService.updateUserInLocalDb(this.userProfileModel);
      })
      .catch(error => {
        this.handleError(error);
      });
    }

    // if (newUserProfile.phoneNumber) {
    //   this.user.({

    //   });
    // }
  }

  linkFb() {
    this.userService.linkFb()
    .catch(error => {
      this.handleError(error);
    });
  }

  linkTwitter() {
    this.userService.linkTwitter()
    .catch(error => {
      this.handleError(error);
    });
  }

  linkGoogle() {
    this.userService.linkGoogle()
    .catch(error => {
      this.handleError(error);
    });
  }

  mapUserProfile(userProfile) {
    if (userProfile) {
      this.userProfileModel.displayName = userProfile.displayName;
      this.userProfileModel.photoURL = userProfile.photoURL;
      this.userProfileModel.phoneNumber = userProfile.phoneNumber;
    }
  }

  hasMappedSocialAccount(providerId) {
    return this.user.providerData.findIndex(provider => provider.providerId === providerId) !== -1;
  }

  photoUpdloaded(event) {
    if (event.target.files && event.target.files[0]) {
      this.userProfileModel.photo = event.target.files[0];
      // make base64 preview url
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfileModel.photoURL = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  handleError(error) {
    this.toastService.show(error.message,
      4000,
      'red');
  }
}
