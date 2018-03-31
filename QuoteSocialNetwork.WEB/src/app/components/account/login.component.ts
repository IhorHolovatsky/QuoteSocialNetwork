import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';

import { UserService } from '../../services/user.service';
import { Constants } from '../../shared/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessageResources = Constants.ERROR_MESSAGE_RESOURCES;

    private loginModel = { email: '', password: '' };
    private subscription: Subscription;
    private brandNew: boolean;

    private REGISTER_LOGIN_MESSAGE;
    private LOGIN_SUCCESS_MESSAGE;

    constructor(
        private userService: UserService,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private formBuilder: FormBuilder,
        private toastService: MzToastService,
        private firebase: AngularFireAuth,
        private translateService: TranslateService
    ) {
    }

    ngOnInit() {
        this.subscription = this.activatedRouter.queryParams.subscribe((param: any) => {
            this.brandNew = param['brandNew'];
            this.loginModel.email = param['email'];
        });

      this.translateService.get(['alerts.registerSuccessLogin', 'alerts.login']).subscribe(t => {
          this.REGISTER_LOGIN_MESSAGE = t['alerts.registerSuccessLogin'];
          this.LOGIN_SUCCESS_MESSAGE = t['alerts.login'];
      });

        this.loginForm = this.formBuilder.group({
            email: [this.loginModel.email, Validators.compose([Validators.required])],
            password: [this.loginModel.password, Validators.compose([Validators.required])]
        });

        if (this.brandNew) {
            this.toastService.show(
                this.REGISTER_LOGIN_MESSAGE,
                4000,
                'green');
        }
    }

    ngOnDestoy() {
        this.subscription.unsubscribe();
    }

    login() {
        this.loginModel = Object.assign({}, this.loginForm.value);

        this.userService.login(this.loginModel.email, this.loginModel.password)
                        .then(result => {
                               this.parseLoginResult(result);
                            },
                            error  => {
                               this.parseLoginErrorResult(error.message);
                            }
                        );
    }

    loginFb() {
        this.userService.loginFb()
                        .then(result => {
                            this.parseLoginResult(result);
                        })
                        .catch(error => {
                            this.parseLoginErrorResult(error.message);
                        });
    }

    loginTwitter() {
        this.userService.loginTwitter()
                        .then(result => {
                            this.parseLoginResult(result);
                        })
                        .catch(error => {
                            this.parseLoginErrorResult(error.message);
                        });
    }

    loginGoogle() {
        this.userService.loginGoogle()
                        .then(result => {
                            this.parseLoginResult(result);
                        })
                        .catch(error => {
                            this.parseLoginErrorResult(error.message);
                        });
    }

    private parseLoginResult(success: Boolean) {
        if (success) {
            this.router.navigate(['/home']);
            this.toastService.show(
                this.LOGIN_SUCCESS_MESSAGE,
                4000,
                'green');
        }
    }

    private parseLoginErrorResult(errorMessage: string) {
        this.toastService.show(
            errorMessage,
            4000,
            'red');
    }
}
