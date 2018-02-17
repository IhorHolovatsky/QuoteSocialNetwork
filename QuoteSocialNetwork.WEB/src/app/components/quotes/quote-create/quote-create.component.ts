import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteService } from '../../../services/quote.service';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.scss']
})
export class QuoteCreateComponent implements OnInit, OnDestroy {
  createQuoteForm: FormGroup;
  createQuoteModel = {
    Text: '',
    Date: new Date(),
    Author: '',
    Location: ''
  };
  currentUser;

  private subscriptions: Subscription[] = [];

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
        Text: [this.createQuoteModel.Text, Validators.compose([Validators.required])],
        Date: [this.createQuoteModel.Date, Validators.compose([Validators.required])],
        Author: [this.createQuoteModel.Author, Validators.compose([Validators.required])],
        Location: [this.createQuoteModel.Location]
      }
    );
    this.subscriptions.push(
      this.firebase.authState.subscribe(
        user => {
          this.currentUser = user;

          if (user) {
            this.createQuoteForm.controls['Author'].patchValue(user.displayName);
          }
        }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  createQuote() {
    const quote = this.createQuoteForm.value;
    quote.UserId = this.currentUser.uid;

    this.quoteService.postQuote(quote)
      .then(data => {
        this.router.navigate(['/quotes']);
      })
      .catch(err => {
      });
  }

}
