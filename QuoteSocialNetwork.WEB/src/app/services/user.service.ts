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
import { User } from '../components/account/user';
import { BaseService } from './base.service';
import { Constants } from '../shared/constants';


@Injectable()
export class UserService extends BaseService {
  public CurrentUserState: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private http: Http,
    private firebase: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
    super();

    this.CurrentUserState.next(JSON.parse(localStorage.getItem(Constants.USER_STORAGE_NAME)));
  }

  getUserProfile(userId: string): Promise<User> {
    if (!userId) {
      return new Promise((resolve, reject) => { resolve(undefined); });
    }

    return this.afDatabase.database.ref(`users/${userId}`)
                                   .once('value', (result) => {
                                      return result;
                                   })
                                   .then(result => {
                                      const user = result.val();
                                      return user ? Object.assign(new User(), user) : null;
                                   });
  }

  register(newUser: RegisterModel): Promise<any> {
    return this.firebase.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
                             .then((success) => {
                               delete newUser.password;
                               delete newUser.confirmPassword;
                               return success;
                             })
                             .then((success) => {
                                // we don't want autologin after registration...
                                this.firebase.auth.signOut();
                                newUser.uid = success.uid;

                                return this.saveUserProfile(newUser as User)
                                           .then(result => {
                                             return true;
                                           });
                             })
                             .catch((error) => {
                                const errorMessage = Constants.FIREBASE_ERRORS_CODES.get(error.code);
                                throw new Error(errorMessage);
                             });
  }

  login(userName, password): Promise<any> {
    return this.firebase.auth.signInWithCredential(firebase.auth.EmailAuthProvider.credential(userName, password))
                             .then((resultJson) => {
                                 const result = resultJson.toJSON();
                                 if (result.error) {
                                   throw new Error(Constants.FIREBASE_ERRORS[result.message]);
                                 }

                                 this.getUserProfile(this.firebase.auth.currentUser.uid)
                                     .then(userProfile => {
                                        localStorage.setItem(Constants.USER_STORAGE_NAME, JSON.stringify(userProfile));
                                        this.CurrentUserState.next(userProfile);
                                      });

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
                                this.getUserProfile(signInResult.user.uid)
                                    .then(result => {
                                        if (!result) {
                                          const userProfile = new User();
                                          userProfile.firstName = signInResult.additionalUserInfo.profile.first_name;
                                          userProfile.lastName = signInResult.additionalUserInfo.profile.last_name;
                                          userProfile.providerId = signInResult.additionalUserInfo.providerId;
                                          userProfile.photoURL = signInResult.user.photoURL;
                                          userProfile.uid = signInResult.user.uid;

                                          this.saveUserProfile(userProfile)
                                              .then(savedUserProfile => {
                                                localStorage.setItem(Constants.USER_STORAGE_NAME, JSON.stringify(userProfile));
                                                this.CurrentUserState.next(savedUserProfile);
                                                return savedUserProfile;
                                              });

                                          return;
                                        }

                                        localStorage.setItem(Constants.USER_STORAGE_NAME, JSON.stringify(result));
                                        this.CurrentUserState.next(result);
                                    });
                                    console.dir(signInResult);
                                return true;
                             });
  }

  loginTwitter(): Promise<any> {
    return this.firebase.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
                             .then(signInResult => {
                                this.getUserProfile(signInResult.user.uid)
                                    .then(result => {
                                        if (!result) {
                                          const userProfile = new User();
                                          const username = signInResult.additionalUserInfo.profile.name.split(' ');

                                          if (username.length === 2) {
                                            userProfile.firstName = username[0];
                                            userProfile.lastName = username[1];
                                          } else {
                                            userProfile.firstName = signInResult.additionalUserInfo.profile.name;
                                          }

                                          userProfile.providerId = signInResult.additionalUserInfo.providerId;
                                          userProfile.photoURL = signInResult.additionalUserInfo.profile.profile_image_url || '';
                                          userProfile.uid = signInResult.user.uid;

                                          this.saveUserProfile(userProfile)
                                              .then(savedUserProfile => {
                                                localStorage.setItem(Constants.USER_STORAGE_NAME, JSON.stringify(userProfile));
                                                this.CurrentUserState.next(savedUserProfile);
                                                return savedUserProfile;
                                              });

                                          return;
                                        }

                                        localStorage.setItem(Constants.USER_STORAGE_NAME, JSON.stringify(result));
                                        this.CurrentUserState.next(result);
                                    });
                                    console.dir(signInResult);
                                return true;
                             });
  }

  loginGoogle(): Promise<any> {
    return this.firebase.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
                             .then(signInResult => {
                                this.getUserProfile(signInResult.user.uid)
                                    .then(result => {
                                        if (!result) {
                                          const userProfile = new User();
                                          userProfile.firstName = signInResult.additionalUserInfo.profile.given_name;
                                          userProfile.lastName = signInResult.additionalUserInfo.profile.family_name;
                                          userProfile.providerId = signInResult.additionalUserInfo.providerId;
                                          userProfile.photoURL = signInResult.user.photoURL;
                                          userProfile.uid = signInResult.user.uid;

                                          this.saveUserProfile(userProfile)
                                              .then(savedUserProfile => {
                                                localStorage.setItem(Constants.USER_STORAGE_NAME, JSON.stringify(savedUserProfile));
                                                this.CurrentUserState.next(savedUserProfile);
                                              });

                                          return;
                                        }

                                        localStorage.setItem(Constants.USER_STORAGE_NAME, JSON.stringify(result));
                                        this.CurrentUserState.next(result);
                                    });
                                return true;
                             });
  }

  logout(): Promise<any> {
    return this.firebase.auth.signOut()
                             .then(result => {
                               localStorage.removeItem(Constants.USER_STORAGE_NAME);
                               this.CurrentUserState.next(null);
                               return result;
                             });
  }

  saveUserProfile(user: User): Promise<User> {
    // Save user to database
    return this.afDatabase.object(`users/${user.uid}`)
                          .set(user)
                          .then(success => {
                             return user;
                          })
                          .catch(error => {
                              throw new Error(error);
                          });
  }
}
