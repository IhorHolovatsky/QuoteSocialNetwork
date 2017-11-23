import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';

import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupService } from '../../services/group.service';
import { GroupComponent } from './group/group.component';
import { QuotesModule } from '../quotes/quotes.module';
import { QuotesListComponent } from '../quotes/quotes-list/quotes-list.component';
import { QuoteService } from '../../services/quote.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuotesModule,
    MaterializeModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'groups',
        component: GroupListComponent
      },
      {
        path: 'groups/create',
        component: GroupCreateComponent
      },
      {
        path: 'groups/:groupId',
        component: GroupComponent
      }])
  ],
  declarations: [GroupCreateComponent, GroupListComponent, GroupComponent],
  providers: [GroupService, QuoteService]
})
export class GroupsModule { }
