import { Injectable } from '@angular/core';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

import { RegisterModel } from '../components/account/register-model';
import { BaseService } from './base.service';
import { Constants } from '../shared/constants';


@Injectable()
export class UserService extends BaseService {

  private userRest;
  constructor(
    private firebase: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private restAngular: Restangular) {
    super();
    this.userRest = this.restAngular.one('user');
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

                                 this.saveUserToLocalDb(resultJson);
                                 localStorage.setItem('token', resultJson.He);
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
                                this.saveUserToLocalDb(signInResult.user);
                                localStorage.setItem('token', signInResult.user.He);
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
                                this.saveUserToLocalDb(signInResult.user);
                                localStorage.setItem('token', signInResult.user.He);
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
                                this.saveUserToLocalDb(signInResult.user);
                                localStorage.setItem('token', signInResult.user.He);
                                return true;
                             })
                             .catch(error => {
                               throw error;
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
                               localStorage.removeItem('token');
                               return result;
                             });
  }

  saveUserToLocalDb(user) {
    return this.userRest.one('exists')
                        .get({userId: user.uid})
                        .toPromise()
                        .then((result) => {
                            console.log(result);
                            if (!result) {
                              this.userRest.post('add', {
                                Id: user.uid,
                                FullName: user.displayName,
                                Email: user.email,
                                PhotoUrl: user.photoURL
                              });
                            }
                        });
  }

  updateUserInLocalDb(user) {
    return this.userRest.patch({
                          Id: user.id,
                          FullName: user.displayName,
                          Email: user.email,
                          PhotoUrl: user.photoURL
                        })
                        .toPromise()
                        .then((result) => {
                            console.log(result);
                            return result;
                        });
  }
}
