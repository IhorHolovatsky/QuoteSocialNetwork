import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';

import { UserService } from '../../services/user.service';
import { Constants } from '../../shared/constants';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})


export class AccountDetailsComponent implements OnInit, OnDestroy {

  userProfileForm: FormGroup;
  userProfileModel = {
    displayName: '',
    photoURL: '',
    phoneNumber: '',
  };
  userProfile: firebase.UserInfo;

  errorMessageResources = Constants.ERROR_MESSAGE_RESOURCES;
  hasNotInternalAccount = false;

  private user: firebase.User;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private firebase: AngularFireAuth
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
      )
    );

    this.buildForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  buildForm() {
    this.userProfileForm = this.formBuilder.group(
      {
        displayName: [this.userProfileModel.displayName, Validators.compose([Validators.required])],
        phoneNumber: [this.userProfileModel.phoneNumber, Validators.compose([Validators.required])]
      }
    );
  }

  saveUserProfile() {

  }

  linkFb() {
    this.userService.linkFb();
  }

  linkTwitter() {
    this.userService.linkTwitter();
  }

  linkGoogle() {
    this.userService.linkGoogle();
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
}
