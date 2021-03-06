import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';

import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupService } from '../../services/group.service';
import { GroupComponent } from './group/group.component';
import { GroupJoinComponent } from './group-join/group-join.component';
import { QuotesModule } from '../quotes/quotes.module';
import { QuotesListComponent } from '../quotes/quotes-list/quotes-list.component';
import { QuoteService } from '../../services/quote.service';
import { AuthGuard } from '../../auth.guard';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuotesModule,
    MaterializeModule.forRoot(),
    TranslateModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'groups',
        component: GroupListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'groups/create',
        component: GroupCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'groups/:groupId',
        component: GroupComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'groups/join/:groupId',
        component: GroupJoinComponent,
        canActivate: [AuthGuard]
      }])
  ],
  declarations: [GroupCreateComponent, GroupListComponent, GroupComponent, GroupJoinComponent],
  providers: [GroupService, QuoteService]
})
export class GroupsModule { }
