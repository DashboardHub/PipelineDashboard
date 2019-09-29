// Core modules
import { Component, OnInit } from '@angular/core';

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
export class AdminComponent implements OnInit {

  public users: UserModel[];
  public activeuserTable: string[] = ['avatar', 'name', 'creationTime', 'lastSignInTime'];
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
    this.userService.findAllUserList().subscribe((users: UserModel[]) => this.users = users);
  }
}
