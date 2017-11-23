import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteService } from '../../../services/quote.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groupId;
  group = { quotes: [], users: []};
  defaultImageUrl: String = 'assets/images/groupPlaceholder.png';
  currentUser;

  quoteText: String = '';

  constructor(
    private groupService: GroupService,
    private quoteService: QuoteService,
    private toastService: MzToastService,
    private firebase: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupId');

      this.groupService.getGroup(this.groupId)
                       .then(group => {
                          this.group = group;
                       });
    });

    this.currentUser = this.firebase.auth.currentUser;
  }

  postQuote(event) {
    if (!this.quoteText.trim()) {
      return;
    }

    // enter code
    if (event.keyCode === 13) {
      this.saveQuote(this.quoteText);
      this.quoteText = '';
    }
  }

  saveQuote(text) {
    const quote = {
      Text: text,
      UserId: this.currentUser.uid,
      GroupId: this.groupId
    };

    this.quoteService.postQuote(quote)
                     .then(data => {
                        this.group.quotes.push(data);
                     })
                     .catch(err => {
                     });
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.groupId)
                     .then(result => {
                        this.router.navigate(['/groups']);
                     });
  }
}
