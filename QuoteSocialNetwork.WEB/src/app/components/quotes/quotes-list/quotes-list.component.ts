import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../../services/quote.service';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {

  quotes = [];
  currentUser;

  constructor(
    private quoteService: QuoteService,
    private toastService: MzToastService,
    private firebase: AngularFireAuth
  ) { }

  ngOnInit() {
    this.currentUser = this.firebase.auth.currentUser;
    this.quoteService.getQuotes(this.currentUser.uid)
                     .then(q => {
                      this.quotes = q;
                     });
  }

  removeQuote(quote) {
    this.quoteService.deteleQuote(quote.id)
                     .then(q => {
                        this.quotes = this.quotes.filter(f => f.id !== quote.id);
                        this.toastService.show('Цитата була успішно видалена!', 4000, 'green');
                     });
  }
}
