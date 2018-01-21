import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import {Constants } from './shared/constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private firebase: AngularFireAuth,
        private auth: AngularFireAuth
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.firebase.authState
                            .take(1)
                            .map(u => {
                                return u && !u.isAnonymous;
                            })
                            .do(authenticated => {
                                if (!authenticated) {
                                    // not logged in so redirect to login page
                                    this.router.navigate(['/login']);
                                }
                            });
    }
}
