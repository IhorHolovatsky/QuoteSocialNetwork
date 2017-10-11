import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import {Constants } from './shared/constants'
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(
        private router: Router,
        private firebase: AngularFireAuth
    ) { }
 
    canActivate() {        
        if (this.firebase.auth.currentUser 
            && !this.firebase.auth.currentUser.isAnonymous) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}