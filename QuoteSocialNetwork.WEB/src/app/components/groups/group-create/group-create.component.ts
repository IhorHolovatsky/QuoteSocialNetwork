import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { Router } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {
  createGroupForm: FormGroup;
  createGroupModel = {
    Name: ''
  };
  currentUser;

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private router: Router,
    private toastService: MzToastService,
    private firebase: AngularFireAuth
  ) { }

  ngOnInit() {
    this.createGroupForm = this.formBuilder.group(
      {
        Name: [this.createGroupModel.Name, Validators.compose([Validators.required])]
      }
    );

    this.currentUser = this.firebase.auth.currentUser;
  }

  createGroup() {
    const group = this.createGroupForm.value;
    this.groupService.createGroup(group);

    // this.groupService
  }
}
