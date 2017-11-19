import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr-client';

import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { MzToastService } from 'ng2-materialize';
import { Restangular } from 'ngx-restangular/dist/esm/src/ngx-restangular';

@Injectable()
export class QuoteService {
  public async: any;

  quotes: string[] = [];

  private hubConnection: HubConnection;
  private isSignalRInited: boolean;
  private quoteRest: any;

  constructor(
    private firebase: AngularFireAuth,
    private toastService: MzToastService,
    private rest: Restangular
  ) {
    this.quoteRest = this.rest.all('quote');
  }

  public postQuote(quote): Promise<any> {
    // replace new lines
    quote.Text = quote.Text.replace(/\n/ig, '<br>');

    return this.quoteRest.post(quote)
                         .toPromise()
                         .then((result) => {
                            return result;
                         });
  }

  public getQuotes(userId): Promise<any> {
    return this.quoteRest.get('user', {userId: userId})
                         .toPromise()
                         .then((result) => {
                             return result;
                         });
  }

  public createQuote(quote): Promise<any> {
      console.log('Sending quote: ', quote);

      return this.hubConnection.invoke('Send', quote)
                               .then(data => {
                                 this.quotes.push(data);
                                 return data;
                               });
  }

  public deteleQuote(quoteId): Promise<any> {
    return this.quoteRest.one(quoteId)
                         .remove()
                         .toPromise()
                         .then((result) => {
                           return result;
                         });
  }

  private init() {
    this.isSignalRInited = true;
    this.hubConnection = new HubConnection(environment.baseApiUrl + '/quotes');

    this.hubConnection.on('Send', (data: any) => {
      this.toastService.show(`Хтось опублікував нову цитату: ${data}`,
                             4000,
                             'orange');
      this.quotes.push(data);
    });

    this.hubConnection.start()
                      .then(() => {
                          console.log('Hub connection started');
                      })
                      .catch(err => {
                          console.log('Error while establishing connection');
                      });
  }
}
