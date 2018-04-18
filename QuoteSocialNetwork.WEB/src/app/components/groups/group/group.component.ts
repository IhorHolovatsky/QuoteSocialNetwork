import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { MzToastService } from 'ng2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteService } from '../../../services/quote.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('quotesContainer') private quotesContainer: ElementRef;

  groupId;
  group = { quotes: [], users: []};
  defaultImageUrl: String = 'assets/images/groupPlaceholder.png';
  currentUser: firebase.User;

  quote = {
    Text: null,
    Author: null,
    Location: null,
    Date: new Date()
  };

  private subscriptions: Subscription[] = [];

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

                          // if group no exists - don't do anyhting
                          if (!this.group) {
                            return;
                          }

                          this.groupService.initSignalR([this.group]);
                       });

      // subscribe to group quotes
      this.subscriptions.push(
        this.groupService.groupQuoteAdded$.subscribe(quote => {
          // if quote related to current group, and it's not quote of current user, then display it
          // current user new quotes have been added via saveQuote method
          if (quote && this.currentUser
              && quote.groupId === this.groupId
              && quote.userId !== this.currentUser.uid) {
            this.group.quotes.push(quote);

            setTimeout(() => {
              this.scrollQuotesContainerToBottom();
            }, 50);
          }
        })
      );
    });

    this.subscriptions.push(
      this.firebase.authState.subscribe(
        user => {
          this.currentUser = user;
          this.quote.Author = this.currentUser.displayName;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngAfterViewInit() {
    this.scrollQuotesContainerToBottom();
  }

  postQuote(event) {
    // enter code
    if (event.keyCode === 13) {
      this.saveQuote(this.quote);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  saveQuote(quote) {
    if (!this.quote.Text.trim()) {
      return;
    }

    quote.UserId = this.currentUser.uid;
    quote.GroupId = this.groupId;

    this.quoteService.postQuote(quote)
                     .then(data => {
                       this.quote = {
                        Text: null,
                        Author: this.currentUser.displayName,
                        Location: null,
                        Date: new Date()
                       };

                       this.groupService.pushGroupQuoteToHub(data, this.groupId);
                       this.group.quotes.push(data);

                       setTimeout(() => {
                         this.scrollQuotesContainerToBottom();
                       }, 50);
                     })
                     .catch(err => {
                     });
  }

  quoteDeletedHandler(quote) {
    this.group.quotes = this.group.quotes.filter(q => q.id !== quote.id);
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.groupId)
                     .then(result => {
                        this.router.navigate(['/groups']);
                     });
  }

  copyInviteLink() {
    const inviteLink = window.location.protocol + '//' +
                       window.location.host + '/groups/join/' + this.groupId;

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = inviteLink;
    textarea.select();

    try {
      document.execCommand('Copy');
    } catch (error) {
      console.log('Unable to copy invite link');
    }

    textarea.remove();
  }

  leaveGroup() {
    if (this.group.users.length === 1) {
      this.deleteGroup();
      return;
    }

    this.groupService.leaveGroup(this.groupId)
                     .then(result => {
                       this.router.navigate(['/groups']);
                     });
  }

  scrollQuotesContainerToBottom(): void {
    try {
        this.quotesContainer.nativeElement.scrollTop = this.quotesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}
