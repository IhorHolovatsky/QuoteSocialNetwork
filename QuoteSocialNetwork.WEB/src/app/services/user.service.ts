import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { of } from 'rxjs/observable/of';

import { RegisterModel } from '../components/account/register-model';
import { BaseService } from './base.service';
import { Constants } from '../shared/constants';


@Injectable()
export class UserService extends BaseService {

  constructor(
    private http: Http,
    private firebase: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
    super();
  }

  register(newUser: RegisterModel): Promise<any> {
    return this.firebase.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
                             .then((user: firebase.User) => {
                               return user.updateProfile(newUser)
                                          .then(result => {
                                            // we don't want autologin after registration...
                                            this.firebase.auth.signOut();
                                            return true;
                                          });
                             })
                             .catch((error) => {
                                const errorMessage = Constants.FIREBASE_ERRORS_CODES.get(error.code);
                                throw new Error(errorMessage);
                             });
  }

  createLogin(email, password): Promise<any> {
    const authCredential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.firebase.auth.currentUser.linkWithCredential(authCredential)
                                         .then(result => {
                                            return result;
                                         })
                                         .catch(error => { throw error; });
  }

  login(userName, password): Promise<any> {
    return this.firebase.auth.signInWithCredential(firebase.auth.EmailAuthProvider.credential(userName, password))
                             .then((resultJson) => {
                                 const result = resultJson.toJSON();
                                 if (result.error) {
                                   throw new Error(Constants.FIREBASE_ERRORS[result.message]);
                                 }

                                 return true;
                             })
                             .catch((error) => {
                                 const errorMessage = Constants.FIREBASE_ERRORS_CODES.get(error.code);
                                 throw new Error(errorMessage);
                             });
  }

  loginFb(): Promise<any> {
    return this.firebase.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
                             .then(signInResult => {
                                return true;
                             });
  }

  linkFb(): Promise<any> {
     return this.firebase.auth.currentUser.linkWithPopup(new firebase.auth.FacebookAuthProvider())
                                          .then(result => {
                                            return result;
                                          })
                                          .catch(error => {
                                            throw error;
                                          });
  }

  loginTwitter(): Promise<any> {
    return this.firebase.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
                             .then(signInResult => {
                                return true;
                             });
  }

  linkTwitter(): Promise<any> {
    return this.firebase.auth.currentUser.linkWithPopup(new firebase.auth.TwitterAuthProvider())
                                         .then(result => {
                                           return result;
                                         })
                                         .catch(error => {
                                           throw error;
                                         });
  }

  loginGoogle(): Promise<any> {
    return this.firebase.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
                             .then(signInResult => {
                                return true;
                             });
  }

  linkGoogle(): Promise<any> {
    return this.firebase.auth.currentUser.linkWithPopup(new firebase.auth.GoogleAuthProvider())
                                         .then(result => {
                                           return result;
                                         })
                                         .catch(error => {
                                           throw error;
                                         });
  }

  logout(): Promise<any> {
    return this.firebase.auth.signOut()
                             .then(result => {
                               return result;
                             });
  }
}
