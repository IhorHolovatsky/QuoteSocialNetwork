import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Constants } from '../../shared/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userProfile: firebase.User;
  isLoggedIn: Boolean;
  defaultImageUrl: String = 'assets/images/userPlaceholder.png';

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private userService: UserService,
    private router: Router,
    private firebase: AngularFireAuth,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.firebase.authState.subscribe(
        user => {
          this.userProfile = user;
          this.isLoggedIn = user && !user.isAnonymous; }
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

  changeLang(lang: string) {
    this.translateService.use(lang);
  }
}
