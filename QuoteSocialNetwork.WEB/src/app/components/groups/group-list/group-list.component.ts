import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ng2-materialize';
import { GroupService } from '../../../services/group.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups = [];
  currentUser;
  defaultImageUrl: String = 'assets/images/groupPlaceholder.png';

  constructor(
    private groupService: GroupService,
    private toastService: MzToastService,
    private firebase: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
    this.groupService.getUserGroups()
                     .then(g => {
                       this.groups = g;
                     });
  }

  goToGroup(groupId) {
    this.router.navigate(['groups', groupId]);
  }
}
