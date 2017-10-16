import { Component, OnInit, Renderer } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MzToastService } from 'ng2-materialize'

import { RegisterModel } from './register-model'
import { UserService } from '../../services/user.service'
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent implements OnInit {

  registerForm: FormGroup;
  registerModel: RegisterModel = new RegisterModel();
  errorMessageResources = Constants.ERROR_MESSAGE_RESOURCES;
  

  submitted : boolean = false;
  isRequesting : boolean;
  errors: string;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    private userServer: UserService,
    private toastService: MzToastService,
    private router: Router
    ) {

  };

  ngOnInit() {
    this.buildForm();
  };

  buildForm() {
    this.registerForm = this.formBuilder.group(
      {
        email: [this.registerModel.email, Validators.compose([Validators.required, Validators.email])],
        password: [this.registerModel.password, Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPassword: [this.registerModel.confirmPassword, Validators.compose([Validators.required])],
        firstName: [this.registerModel.firstName, Validators.compose([Validators.required])],
        lastName: [this.registerModel.lastName, Validators.compose([Validators.required])]
      }
    )
  };

  onSubmit() {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    this.registerModel = Object.assign({}, this.registerForm.value);

    this.userServer.register(this.registerModel)
                   .then(result => {
                          this.isRequesting = false;
                          if (result){
                            this.router.navigate(['/login'], { queryParams: {email: this.registerModel.email, brandNew: true }})
                          }
                        },
                         errors => {
                          this.toastService.show(errors.message,
                                                 4000, 
                                                 'red');
                      });
  }

}
