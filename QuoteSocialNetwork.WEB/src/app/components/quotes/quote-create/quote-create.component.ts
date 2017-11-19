import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteService } from '../../../services/quote.service';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.scss']
})
export class QuoteCreateComponent implements OnInit {
  createQuoteForm: FormGroup;
  createQuoteModel = {
    Text: ''
  };
  currentUser;

  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private router: Router,
    private toastService: MzToastService,
    private firebase: AngularFireAuth
  ) { }

  ngOnInit() {
    this.createQuoteForm = this.formBuilder.group(
      {
        Text: [this.createQuoteModel.Text, Validators.compose([Validators.required])]
      }
    );
    this.currentUser = this.firebase.auth.currentUser;
  }

  createQuote() {
    const quote = this.createQuoteForm.value;
    quote.UserId = this.currentUser.uid;
    quote.CreatedAt = new Date();

    this.quoteService.postQuote(quote)
                     .then(data => {
                        this.router.navigate(['/quotes']);
                     })
                     .catch(err => {
                     });
  }

}
