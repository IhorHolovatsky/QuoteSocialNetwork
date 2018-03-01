import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { QuoteService } from '../../../services/quote.service';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 })),
      ])
    ]),
  ]
})

export class QuotesListComponent implements OnInit, OnDestroy {

  @Input() quotes;
  @Output() quoteDeleteEvent: EventEmitter<any> = new EventEmitter<any>();

  currentUser = { uid: ''};
  defaultImageUrl: String = 'assets/images/userPlaceholder.png';

  private subscriptions: Subscription[] = [];

  constructor(
    private quoteService: QuoteService,
    private toastService: MzToastService,
    private firebase: AngularFireAuth
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.firebase.authState.subscribe(
        user => {
          this.currentUser = user;

          // usually this is a case where we show quotes in group
          if (this.hasInputQuotes || !this.currentUser) {
            return;
          }

          this.quotes = [];
          this.quoteService.getQuotes(this.currentUser.uid)
                           .then(q => {
                            // here we are showing only quotes which are related to user (not to group)
                            this.quotes = q.filter(quote => !quote.groupId);
                           });
        })
    );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  removeQuote(quote) {
    this.quoteService.deteleQuote(quote.id)
                     .then(q => {
                        this.quotes = this.quotes.filter(f => f.id !== quote.id);
                        this.toastService.show('Цитата була успішно видалена!', 4000, 'green');
                        this.quoteDeleteEvent.emit(q);
                     });
  }

  shareFacebook(quote) {
    window['FB'].ui(
    {
      method: 'share',
      hashtag: '#quote',
      quote: this.getQuoteText(quote),
      href: 'https://quotesocialnetwork.firebaseapp.com'
    }, function(response){});
  }

  getTwitterShareParameters(quote) {
    let params = 'text=' + this.getQuoteText(quote);
    params += '&url=' + 'https://quotesocialnetwork.firebaseapp.com';
    params += '&hashtags=' + 'quote';

    return encodeURI(params);
  }

  getQuoteText(quote) {
    return  `${quote.text.replace(/<br>/ig, '\n')}
    \nАвтор: ©${quote.author}
    \nМісце: ${quote.location}
    \nДата: ${new Date(quote.date).toLocaleDateString()} ${new Date(quote.date).toLocaleTimeString()}`;
  }

  get hasInputQuotes() {
    return this.quotes;
  }

  private getUserShortName(name: String) {
    if (!name || name.trim() === '') {
      return name;
    }
    const parts = name.split(' ');

    if (parts.length < 2) { return name; }

    return `${parts[0]} ${parts[1].slice(0, 1)}.`;
  }
}
