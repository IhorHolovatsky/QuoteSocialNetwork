import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from '../account/user';
import { UserService } from '../../services/user.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private userProfile : User;
  private isLoggedIn : Boolean;
  private subscriptions: Subscription[] = new Array<Subscription>();
  
  constructor(
    private userService: UserService,
    private router: Router,
    private firebase: AngularFireAuth
  ) {    
  }

  ngOnInit() { 
    this.subscriptions.push(this.firebase.authState.subscribe(user => {
                              this.isLoggedIn = user && !user.isAnonymous;

                              if (this.isLoggedIn){
                                this.userService.getUserProfile(user.uid)
                                                .then(result => {                                                  
                                                    this.userProfile = result;
                                                });
                              } else {
                                this.userProfile = null;
                              }                             
                            }));                                              
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  logout(){
    this.userService.logout()
                    .then(x => {
                        this.router.navigate(['/login'])
                    });
  }

  getUserFullName(){    
    if (this.isLoggedIn){
      if (this.userProfile){
        return this.userProfile.getDisplayName();
      }

      return this.firebase.auth.currentUser.displayName;
    }

    return null;
  }

}