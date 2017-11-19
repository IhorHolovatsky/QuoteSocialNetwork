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

  public getGroup(groupId) {

  }

  public getUserGroups(): Promise<any> {
    return this.groupRest.get('user')
                         .toPromise()
                         .then((result) => {
                           return result;
                         });
  }

  public createGroup(group): Promise<any> {
    return this.groupRest.post(group)
                         .toPromise()
                         .then((result) => {
                           return result;
                         });

  }

  public joinToGroup(groupId) {

  }

  public leaveGroup(groupId) {

  }
}
