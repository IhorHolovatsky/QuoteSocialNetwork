import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteService } from '../../../services/quote.service';
import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.scss']
})
export class QuoteCreateComponent implements OnInit {
  createQuoteForm: FormGroup;
  createQuoteModel = {
    text: ''
  };
  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private toastService: MzToastService
  ) { }

  ngOnInit() {
    this.createQuoteForm = this.formBuilder.group(
      {
        quoteText: [this.createQuoteModel.text, Validators.compose([Validators.required])]
      }
    );
  }

  createQuote() {
    const quote = this.createQuoteForm.value;

    this.quoteService.createQuote(quote.quoteText)
                     .then(data => {

                     })
                     .catch(err => {
                     });
  }

}
