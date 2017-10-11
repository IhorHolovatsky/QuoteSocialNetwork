import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MzToastService } from 'ng2-materialize'
import { AngularFireAuth } from 'angularfire2/auth';

import { UserService } from '../../services/user.service'

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent {
    private loginForm: FormGroup;
    private loginModel = { email: '', password: '' };
    private subscription: Subscription;
    private brandNew: boolean;

    // error messages
    errorMessageResources = {
        email: {
            required: 'Email is required.',
        },
        password: {
            required: 'Password is required.',
        }
    };

    constructor(
        private userService: UserService,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private formBuilder: FormBuilder,
        private toastService: MzToastService,
        private firebase: AngularFireAuth
    ) {
    }

    ngOnInit() {
        this.subscription = this.activatedRouter.queryParams.subscribe((param: any) => {
            this.brandNew = param['brandNew'];
            this.loginModel.email = param['email'];
        });

        this.loginForm = this.formBuilder.group({
            email: [this.loginModel.email, Validators.compose([Validators.required])],
            password: [this.loginModel.password, Validators.compose([Validators.required])]
        });

        if (this.brandNew){
            this.toastService.show(
                'Все готово! Увійдіть будь-ласка в свій аккаунт.',
                4000, 
                'green')
        }
    };

    ngOnDestoy() {
        this.subscription.unsubscribe();
    };

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

    loginFb(){
        this.userService.loginFb()
                        .then(result => {
                            this.parseLoginResult(result);
                        })
                        .catch(error => {
                            this.parseLoginErrorResult(error.message);
                        });
    }

    loginGoogle(){
        this.userService.loginGoogle()
                        .then(result => {
                            this.parseLoginResult(result);
                        })
                        .catch(error => {
                            this.parseLoginErrorResult(error.message);
                        });
    }

    private parseLoginResult(success : Boolean){
        if (success) {
            this.router.navigate(['/home']);
            this.toastService.show(
                "Ви успішно ввійшли в сисетему!",
                4000, 
                'green')
        }
    }

    private parseLoginErrorResult(errorMessage : string){
        this.toastService.show(
            errorMessage,
            4000, 
            'red')
    }
};