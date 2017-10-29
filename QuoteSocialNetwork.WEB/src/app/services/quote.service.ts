import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr-client';

import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { MzToastService } from 'ng2-materialize';

@Injectable()
export class QuoteService {
  public async: any;

  quotes: string[] = [];

  private actionUrl: string;
  private headers: HttpHeaders;
  private hubConnection: HubConnection;

  constructor(
    private firebase: AngularFireAuth,
    private toastService: MzToastService
  ) {
    this.actionUrl = `${environment.baseApiUrl}api/quotes/`;

    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    this.init();
  }

  public createQuote(quote): Promise<any> {
      console.log('Sending quote: ', quote);

      return this.hubConnection.invoke('Send', quote)
                               .then(data => {
                                 this.quotes.push(data);
                                 return data;
                               });
  }

  private init() {
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
