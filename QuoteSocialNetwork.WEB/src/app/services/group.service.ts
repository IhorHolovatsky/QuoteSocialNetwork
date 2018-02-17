import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MzToastService } from 'ng2-materialize';
import { Restangular } from 'ngx-restangular';
import { HubConnection } from '@aspnet/signalr-client';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GroupService {

  // groups to subscribe in SignalR
  groups = [];
  groupQuoteAdded$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private groupRest: any;
  private hubConnection: HubConnection;
  private isSignalRInited: boolean;

  constructor(
    private firebase: AngularFireAuth,
    private toastService: MzToastService,
    private rest: Restangular
  ) {
    this.groupRest = this.rest.all('group');
  }


  public getGroup(groupId): Promise<any> {
    return this.groupRest.get(groupId)
                         .toPromise()
                         .then((result) => {
                           return result;
                         });
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

  public deleteGroup(groupId): Promise<any> {
    return this.groupRest.one(groupId)
                         .remove()
                         .toPromise()
                         .then((result) => {
                           return result;
                         });
  }

  public joinToGroup(groupId): Promise<any> {
    return this.groupRest.all('join')
                         .one(groupId)
                         .post()
                         .toPromise()
                         .then((result) => {
                           if (result.error) {
                             throw result.error;
                           }

                           return result;
                         });
  }

  public leaveGroup(groupId) {
    return this.groupRest.all('leave')
                         .one(groupId)
                         .post()
                         .toPromise()
                         .then((result) => {
                           if (result.error) {
                             throw result.error;
                           }

                          return result;
                         });
  }

  public pushGroupQuoteToHub(quote, groupId): Promise<any> {
    return this.hubConnection.invoke('Send', quote, groupId);
  }

  public initSignalR(groups: any[]) {
    // if connection was not started --> start it, and subscribe to groups
    if (!this.isSignalRInited) {
      this.isSignalRInited = true;
      this.hubConnection = new HubConnection(environment.baseApiUrl + '/quotes');

      // listen new quotes
      this.hubConnection.on('Send', (data: any) => {
        this.groupQuoteAdded$.next(data);
      });

      this.hubConnection.start()
                        .then(() => {
                            this.groups = groups;
                            this.subscribeToListenGroup(groups);
                            console.log('Hub connection started');
                        })
                        .catch(err => {
                            console.log('Error while establishing connection');
                        });
      return;
    }

    // if connection was started, but there is a need to listen new group
    const newGroups = groups.filter(g => !this.groups.some(gg => gg.id === g.id));
    this.groups = this.groups.concat(newGroups);

    this.subscribeToListenGroup(newGroups);
  }

  private subscribeToListenGroup(groups) {

    groups.forEach(group => {
      this.hubConnection.invoke('JoinToGroup', group.id);
    });
  }

  private disposeSignalR() {
    this.hubConnection.stop();
  }
}
