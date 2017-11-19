import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groupId;

  constructor(
    private groupService: GroupService,
    private toastService: MzToastService,
    private firebase: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupId');
    });
  }
  
}
