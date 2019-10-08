// Core modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// DashboardHub Model and services
import { UserService } from '@core/services/user.service';
import { UserModel } from '@shared/models/user.model';

/**
 * Users list component
 */
@Component({
  selector: 'dashboard-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {

  public activeuserTable: string[] = ['avatar', 'name', 'creationTime', 'lastSignInTime'];
  public userSubscription: Subscription;
  public users: UserModel[];

  /**
   * Life cycle method
   * @param userService UserService
   */
  constructor(
    private userService: UserService
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.userSubscription = this.userService
      .findAllUserList()
      .subscribe((users: UserModel[]) => this.users = users);
  }

  /**
   * Lifecycle destroy method
   */
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
