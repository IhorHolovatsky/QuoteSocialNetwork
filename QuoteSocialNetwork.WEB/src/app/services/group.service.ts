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

  public joinToGroup(groupId) {

  }

  public leaveGroup(groupId) {

  }

  public pushGroupQuoteToHub(quote, groupId): Promise<any> {
    return this.hubConnection.invoke('Send', quote, groupId);
  }

  public initSignalR(groups) {

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
                            this.subscribeToListenGroup(groups);
                            console.log('Hub connection started');
                        })
                        .catch(err => {
                            console.log('Error while establishing connection');
                        });
      return;
    }

    this.subscribeToListenGroup(groups);
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
