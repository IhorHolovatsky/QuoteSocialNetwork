import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';

import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupService } from '../../services/group.service';

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
      }])
  ],
  declarations: [GroupCreateComponent, GroupListComponent],
  providers: [GroupService],
})
export class GroupsModule { }
