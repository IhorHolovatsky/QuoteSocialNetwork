import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../../services/quote.service';
import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {

  quotes = [];

  constructor(
    private quoteService: QuoteService,
    private toastService: MzToastService
  ) { }

  ngOnInit() {
    this.quotes = this.quoteService.quotes;
  }

}
