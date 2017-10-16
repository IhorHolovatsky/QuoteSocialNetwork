import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from './user';
import { UserService } from '../../services/user.service';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html'
})


export class AccountDetailsComponent implements OnInit {

  private userProfileForm: FormGroup;
  private errorMessageResources = Constants.ERROR_MESSAGE_RESOURCES;
  private currentUser: User = new User();
  private subscriptions: Subscription[] = new Array<Subscription>();
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { 

  }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.CurrentUserState.subscribe(
        userProfile => { this.currentUser = userProfile; }
      )
    );

    this.buildForm();
  };
  
  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  buildForm() {
    this.userProfileForm = this.formBuilder.group(
      {
        email: [this.currentUser.email, Validators.compose([Validators.required, Validators.email])],
        firstName: [this.currentUser.firstName, Validators.compose([Validators.required])],
        lastName: [this.currentUser.lastName, Validators.compose([Validators.required])]
      }
    )
  };

}
