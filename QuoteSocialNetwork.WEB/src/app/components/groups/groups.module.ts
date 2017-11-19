import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupListComponent } from './group-list/group-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GroupCreateComponent, GroupListComponent]
})
export class GroupsModule { }
