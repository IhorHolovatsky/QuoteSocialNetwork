import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MzToastService } from 'ng2-materialize';

import { RegisterModel } from './register-model';
import { UserService } from '../../services/user.service';
import { Constants } from '../../shared/constants';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  registerModel: RegisterModel = new RegisterModel();
  errorMessageResources = Constants.ERROR_MESSAGE_RESOURCES;

  submitted = false;
  isRequesting: boolean;
  errors: string;

  private REGISTER_SUCCESS_MESSAGE;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: AngularFireAuth,
    private renderer: Renderer,
    private userService: UserService,
    private toastService: MzToastService,
    private router: Router,
    private translateService: TranslateService
    ) {
  }

  ngOnInit() {
    if (this.firebase.auth.currentUser) {
      Object.assign(this.registerModel, this.firebase.auth.currentUser.providerData[0]);
    }

    this.translateService.get('alerts.registerSuccess').subscribe(t => {
      this.REGISTER_SUCCESS_MESSAGE = t;
  });

    this.buildForm();
  }

  ngOnDestroy() {
  }

  buildForm() {
    this.registerForm = this.formBuilder.group(
      {
        email: [this.registerModel.email, Validators.compose([Validators.required, Validators.email])],
        password: [this.registerModel.password, Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPassword: [this.registerModel.confirmPassword, Validators.compose([Validators.required])],
        displayName: [this.registerModel.displayName, Validators.compose([Validators.required])]
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    this.registerModel = Object.assign({}, this.registerForm.value);


    if (this.firebase.auth.currentUser) {
      this.userService.createLogin(this.registerModel.email, this.registerModel.password)
                      .then(result => {
                        if (result) {
                          this.toastService.show(this.REGISTER_SUCCESS_MESSAGE,
                                                 4000,
                                                 'green');
                          this.router.navigate(['/account/details']);
                        }
                      })
                      .catch(error => {
                        this.toastService.show(error.message,
                                               4000,
                                               'red');
                      });
      return;
    }

    this.userService.register(this.registerModel)
                    .then(result => {
                          this.isRequesting = false;
                          if (result) {
                            this.router.navigate(['/login'], { queryParams: {email: this.registerModel.email, brandNew: true }});
                          }
                        },
                         errors => {
                          this.toastService.show(errors.message,
                                                 4000,
                                                 'red');
                      });
  }

}
