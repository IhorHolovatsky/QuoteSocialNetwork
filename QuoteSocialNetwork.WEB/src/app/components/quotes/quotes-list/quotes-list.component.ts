import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuoteService } from '../../../services/quote.service';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {

  @Input() quotes;
  @Output() quoteDeleteEvent: EventEmitter<any> = new EventEmitter<any>();

  currentUser;
  defaultImageUrl: String = 'assets/images/userPlaceholder.png';

  constructor(
    private quoteService: QuoteService,
    private toastService: MzToastService,
    private firebase: AngularFireAuth
  ) { }

  ngOnInit() {

    // usually this is a case where we show quotes in group
    if (this.hasInputQuotes) {
      return;
    }
    this.quotes = [];

    this.currentUser = this.firebase.auth.currentUser;
    this.quoteService.getQuotes(this.currentUser.uid)
                     .then(q => {
                      // here we are showing only quotes which are related to user (not to group)
                      this.quotes = q.filter(quote => !quote.groupId);
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

  get hasInputQuotes() {
    return this.quotes;
  }
}
