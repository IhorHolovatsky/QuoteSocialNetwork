import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MzToastService } from 'ng2-materialize';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GroupService } from '../../../services/group.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-group-join',
  templateUrl: './group-join.component.html',
  styleUrls: ['./group-join.component.scss']
})
export class GroupJoinComponent implements OnInit, OnDestroy {

  groupId;
  group = { name: ''};

  private subscriptions: Subscription[] = [];
  private currentUser;

  constructor(
    private groupService: GroupService,
    private toastService: MzToastService,
    private firebase: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupId');

      this.groupService.getGroup(this.groupId)
                       .then(group => {
                          this.group = group;
                       });
    });

    // subscribe to group quotes
    this.subscriptions.push(
      this.firebase.authState.subscribe(user => {
        this.currentUser = user;
      })
    );
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
                        'Ви успішно приєднались до групи ' + this.group.name + '!',
                        4000,
                        'green');
                     });
  }
}
