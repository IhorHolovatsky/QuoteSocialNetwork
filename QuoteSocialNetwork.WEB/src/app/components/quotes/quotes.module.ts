import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { QuoteCreateComponent } from './quote-create/quote-create.component';
import { QuotesComponent } from './quotes.component';
import { QuoteService } from '../../services/quote.service';
import { AuthGuard } from '../../auth.guard';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterializeModule.forRoot(),
    TranslateModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'quotes',
        component: QuotesListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'quotes/create',
        component: QuoteCreateComponent,
        canActivate: [AuthGuard]
      }])
  ],
  providers: [QuoteService],
  declarations: [QuotesListComponent, QuoteCreateComponent, QuotesComponent],
  exports: [QuotesListComponent]
})
export class QuotesModule { }
