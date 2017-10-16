import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from '../account/user';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private userProfile: User;
  private isLoggedIn: Boolean;
  private subscriptions: Subscription[] = new Array<Subscription>();
  private defaultImageUrl: String = 'assets/images/userPlaceholder.png';

  constructor(
    private userService: UserService,
    private router: Router,
    private firebase: AngularFireAuth
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.firebase.authState.subscribe(
        user => { this.isLoggedIn = user && !user.isAnonymous; }
      )
    );

    // subscripe to load logged in user after login
    this.subscriptions.push(
      this.userService.CurrentUserState.subscribe(
        userProfile => {
          this.userProfile = userProfile || new User();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  logout() {
    this.userService.logout()
                    .then(x => {
                        this.router.navigate(['/login']);
                    });
  }

  getUserDisplayName() {
    return `${this.userProfile.firstName || ''} ${this.userProfile.lastName || ''}`;
  }

}
