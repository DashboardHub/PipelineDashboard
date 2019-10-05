// Core modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// DashboardHub Model and services
import { UserService } from '@core/services/user.service';
import { UserModel } from '@shared/models/user.model';

/**
 * Admin component
 */
@Component({
  selector: 'dashboard-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {

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
