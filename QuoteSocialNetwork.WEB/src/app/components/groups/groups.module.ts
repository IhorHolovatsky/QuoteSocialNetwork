import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';

import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupService } from '../../services/group.service';
import { GroupComponent } from './group/group.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  providers: [GroupService],
})
export class GroupsModule { }
