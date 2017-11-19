import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MzToastService } from 'ng2-materialize';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class GroupService {

  private groupRest: any;

  constructor(
    private firebase: AngularFireAuth,
    private toastService: MzToastService,
    private rest: Restangular
  ) {
    this.groupRest = this.rest.all('group');
  }

  public createGroup(group) {

  }

  public joinToGroup(groupId) {

  }

  public leaveGroup(groupId) {

  }
}
