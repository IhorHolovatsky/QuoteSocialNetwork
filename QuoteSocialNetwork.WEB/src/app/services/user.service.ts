import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { of } from 'rxjs/observable/of';

import { RegisterModel } from '../components/account/register-model';
import { User } from '../components/account/user';
import { BaseService } from './base.service';
import { Constants } from '../shared/constants'


@Injectable()
export class UserService extends BaseService {
  
  private currentUser : firebase.UserInfo;
  private subscription : Subscription;

  constructor(
    private http: Http,
    private firebase: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
    super();
  }

  getUserProfile(userId : string) : Promise<User>{
    if (!userId){
      return new Promise((resolve, reject) => { resolve(undefined) });
    }
    
    return this.afDatabase.database.ref(`users/${userId}`)
                                   .once('value', (result) => {
                                      return result;
                                   })
                                   .then(result => {
                                      let user = result.val();
                                      return user ? Object.assign(new User(), user) : null;
                                   });
  }

  register(newUser : RegisterModel) : Promise<any> {
      
    let body = JSON.stringify(newUser);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    return this.firebase.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
                             .then((success) => {
                                //we don't want autologin after registration...
                                this.firebase.auth.signOut();
                                
                                let user = {
                                    firstName: newUser.firstName,
                                    lastName: newUser.lastName
                                };

                                //Save user to database
                                return this.afDatabase.object(`users/${success.uid}`)
                                                      .set(user)
                                                      .then(success => {
                                                        return true;
                                                      })
                                                      .catch(error => {
                                                        throw new Error(error);
                                                      });
                             })
                             .catch((error) => {
                                let errorMessage = Constants.FIREBASE_ERRORS_CODES.get(error.code);
                                throw new Error(errorMessage);  
                             });                         
  }  

  login(userName, password) : Promise<any> {
    return this.firebase.auth.signInWithCredential(firebase.auth.EmailAuthProvider.credential(userName, password))
                             .then((resultJson) => {  
                                 var result = resultJson.toJSON();
                                 if (result.error){
                                   throw new Error(Constants.FIREBASE_ERRORS[result.message])
                                 }     
                                 
                                 return true;
                             })
                             .catch((error) => {
                                 let errorMessage = Constants.FIREBASE_ERRORS_CODES.get(error.code);
                                 throw new Error(errorMessage);
                             });
  }

  loginFb() : Promise<any> {
    return this.firebase.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginGoogle() : Promise<any> {
    return this.firebase.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() : Promise<any> {
    return this.firebase.auth.signOut();
  }
}
