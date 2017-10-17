import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { User } from './user';
import { UserService } from '../../services/user.service';
import { Constants } from '../../shared/constants';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html'
})


export class AccountDetailsComponent implements OnInit, OnDestroy {

  private userProfileForm: FormGroup;
  private userProfile: User = new User();
  private errorMessageResources = Constants.ERROR_MESSAGE_RESOURCES;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private firebase: AngularFireAuth
  ) {
    console.dir(firebase.auth.currentUser);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.CurrentUserState.subscribe(
        userProfile => {
          this.userProfile = userProfile;
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
        email: [this.userProfile.email, Validators.compose([Validators.required, Validators.email])],
        firstName: [this.userProfile.firstName, Validators.compose([Validators.required])],
        lastName: [this.userProfile.lastName, Validators.compose([Validators.required])]
      }
    );
  }

}
