import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MzToastService } from 'ng2-materialize';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GroupService } from '../../../services/group.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-join',
  templateUrl: './group-join.component.html',
  styleUrls: ['./group-join.component.scss']
})
export class GroupJoinComponent implements OnInit, OnDestroy {

  isUserAlreadyInGroup = false;
  groupId;
  group = { name: '', quotes: [], users: []};
  defaultImageUrl: String = 'assets/images/groupPlaceholder.png';

  private subscriptions: Subscription[] = [];
  private currentUser: firebase.User;

  private dataLoaded$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  private JOIN_SUCCESS_MESSAGE;

  constructor(
    private groupService: GroupService,
    private toastService: MzToastService,
    private firebase: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupId');

      this.groupService.getGroup(this.groupId)
                       .then(group => {
                          this.group = group;
                          this.dataLoaded$.next(true);
                       });
    });

    // subscribe to group quotes
    this.subscriptions.push(
      this.firebase.authState.subscribe(user => {
        this.currentUser = user;
        this.dataLoaded$.next(true);
      }),
      this.translateService.get('alerts.joinGroupSuccess').subscribe(t => {
        this.JOIN_SUCCESS_MESSAGE = t;
      })
    );

    this.dataLoaded$.subscribe(val => {
      if (this.currentUser && this.group) {
        this.isUserAlreadyInGroup = this.group.users.some(u => this.currentUser.uid === u.id);

        if (this.isUserAlreadyInGroup) {
          this.router.navigate([`groups/${this.groupId}`]);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  confirmJoinToGroup() {
    this.groupService.joinToGroup(this.groupId)
                     .then(result => {
                        this.toastService.show(
                        `${this.JOIN_SUCCESS_MESSAGE} ` + this.group.name + '!',
                        4000,
                        'green');
                        this.router.navigate(['groups', this.groupId]);
                     })
                     .catch(error => {
                      this.toastService.show(
                        error,
                        4000,
                        'red');
                     });
  }
}
