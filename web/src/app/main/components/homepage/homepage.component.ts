import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { UserService } from '../../../core/services/index.service';
import { UserStatsModel } from '../../../shared/models/index.model';

@Component({
  selector: 'dashboard-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {

  private userSubscription: Subscription;
  public users: UserStatsModel[] = [];
  public title: string = 'Public Projects';

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService
      .findAllUserStats()
      .subscribe((users: UserStatsModel[]) => {
        this.users = users;
      });
  }

  ngDestroy(): void {
    this.userSubscription
      .unsubscribe();
  }
}
